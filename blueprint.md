# Biz-Forecaster Application Blueprint

## 1. Overview

**Purpose:** Biz-forecaster is a web application designed to help entrepreneurs plan their startup businesses by providing financial ratios, projections, and forecasts. The application prioritizes security and compliance with PCI-DSS requirements for credit card processing.

**Key Features:**
- Intuitive user interface for financial planning.
- Multi-tenant architecture for individual user workspaces.
- Secure payment processing capabilities.
- Accurate business financial calculations.
- User authentication via Google Sign-In, email/password, and Two-Factor Authentication (OTP).
- A knowledge-base for business finance concepts.

## 2. Application Flow

BizForecaster is a multi-tenant application. In addition to registering the user with Google Firebase  Authentication Service, the registration process includes creating an isolated schema for the tenant. 

*   **Registration:**
1. Tenant registration backend: 
*   A server-side function to create a new tenant programmatically using the Identity Platform Admin SDK.
*   The function must accept a unique tenantName and return the new tenantId.
*   The registration process must generate a secure toke using hash and email it to the user.   Once the token is validated, the user can log in with appropriate permission.
*   Consequent logins beyond the initial registration, can be handled using (One-Time Passcode) OTP. 
*   If the user does not specify multi-locations flag, the value of 'default' woudl be inserted in the locations table.
*   Payment processing and the affiliated credit card transactions will be integrated to interface with the registration rpcess, at a future date. 

2. Tenant administrator registration: A server-side function to register the initial administrator for the newly created tenant.
The function should take the tenantId and the admin's credentials (e.g., email, password).
The user must be created within the specific tenant's user silo.


3. User Initiates Registration from Frontend
When a user clicks the "Sign Up" button on the register tab of app/page.tsx, a secure token is generated and sent to the user's email.
Code Verification: \biz-forecaster\biz-forecaster-frontend\app\page.tsx. 
The handleRegisterSubmit function does this.

        * It captures the companyName, email, and password.
        * It makes a POST request to the /registration/start backend endpoint.
        * Upon a successful API response, it displays the message: Registration initiated. Please check your email for a verification link.

4. Tenant and Schema Creation on the Backend
Description: After the user verifies the token, the registration process continues by creating an isolated schema with a specific structure of tables and relationships.
Code Verification: This is confirmed in the compiled backend service file biz-forecaster\biz-forecaster-api\dist\tenants\tenants.service.js.

1. Single Source of Truth (The Biggest Win): The synchronize: true option tells TypeORM to read the metadata from all the entity files you provided in the entities array. It then automatically generates the correct CREATE TABLE SQL based on your @Entity(), @Column(), and @ManyToOne() decorators. If you add a middle_name property to your User entity, you don't have to change anything else. The next time a tenant registers, this process will automatically include the new column.

2. Elimination of Manual SQL Injection Risks: The old method relied on a regular expression (/^[a-z0-9-]+$/) to sanitize the schemaName. While effective, it's still a manual check. The new approach is inherently safer. The schema: schemaName option is passed to the TypeORM and the pg driver, which handle the quoting and context-switching securely. The ORM generates all the DDL (CREATE TABLE, etc.) itself, completely removing the risk of an injection vulnerability in the table or column definitions.

3. Maintainability and Readability: The code is now dramatically simpler and more declarative. The createTenantSchema method's purpose is clear: "create a schema that matches our defined entities." All the complex, error-prone SQL logic is gone, delegated to the ORM which is designed and tested to do it correctly.

4. Correctness and Type Safety: TypeORM correctly maps TypeScript types (string, number, Date, enum) to the appropriate PostgreSQL column types (VARCHAR, DECIMAL, TIMESTAMP, custom ENUM types). This prevents a whole class of bugs that can arise from manually writing incorrect CREATE TABLE statements.

 The application handles this creation process entirely at runtime. The key file is biz-forecaster\biz-forecaster-api\dist\tenants\tenants.service.js.

        * create method: When a new tenant is registered, this method is called.
createTenantSchema method: Inside the create method, a call is made to createTenantSchema. This method contains a very large SQL script.
        * CREATE SCHEMA command: The very first thing this script does is execute CREATE SCHEMA IF NOT EXISTS "${schemaName}";.
This is the exact moment the database "learns" about the new tenant's schema. It's a runtime operation, not a pre-configured state. Immediately after, the same script creates all the necessary tables (locations, users, clients, etc.) inside that new schema.

1. A user is created in Firebase.
2. A Tenant record is created in the public schema.
3. The createTenantSchema method successfully runs the large SQL script, creating the new schema (e.g., org-acm) and all the necessary tables within it. This is confirmed by the log: Schema "org-acm" and tables created successfully.
4. The completeRegistration method then calls tenantsService.executeInTenant(...) to create the User record inside the new schema.
5. Inside executeInTenant, it tries to get a repository for the User entity by calling queryRunner.manager.getRepository(User).


**5. How the Application Validate that the database supports the incoming table structure.**

Step 1: The Bootstrap Connection (in app.module.ts)
When the NestJS application starts, *app.module.ts* establishes a primary database connection defined in app.module.ts. 

This tells TypeORM that this main connection only needs to know about the Tenant entity. This connection's sole purpose is to interact with the public.tenants table to find out which tenants exist and what their schema names are.

**Below is the complete list of entities that will be created as tables inside each new tenant's schema:**
Module File	                 | Entity Provided
----------------------------------------------------
activities.module.ts	                |   Activity, ActivityCogs, ActivitySalesProjection
activity-capital-expenses.module.ts     |	ActivityCapitalExpense
activity-operational-expenses.module.ts |	ActivityOperationalExpense
activity-products.module.ts	            |   ActivityProduct     
activity-startup-items.module.ts	    |   ActivityStartupItem
audit_logs.module.ts	                |   AuditLog
biz_forecasts.module.ts	                |   BizForecast
business-plans.module.ts	            |   BusinessPlan, BusinessPlanSection, BusinessPlanTemplate
clients.module.ts	                    |   Client
collaborators.module.ts	                |   BusinessPlanCollaborator
comments.module.ts	                    |   BusinessPlanComment
financial-ratios.module.ts	            |   FinancialRatio (Implicit)
goals.module.ts	                        |   Goal
kpis.module.ts	                        |   Kpi
notifications.module.ts	                |   Notification
reports.module.ts	                    |   Report (Implicit)
startup-items.module.ts	                |   ActivityStartupItem
tasks.module.ts	                        |   Task
users.module.ts	                        |   User

**Step 2: The Dynamic Tenant Connection (Handled by Middleware)**

When a user makes an API request (e.g., to get their business plans), the following happens at runtime:

1. A middleware (like the TenantMiddleware configured in your app.module.ts) intercepts the request.
2. It identifies the tenant from the request (e.g., from a subdomain or a JWT token).
3. It uses the bootstrap connection to query the public.tenants table and retrieve that tenant's specific schemaName.
4. It then establishes a new, temporary, tenant-specific database connection. This new connection is configured to use the tenant's unique schema (e.g., SET search_path TO 'org_acme_corp').
5. This tenant-specific connection is then used for the remainder of the request to query tables like business_plans, users, etc., which exist inside that tenant's schema.
This is how the application bridges the gap. It doesn't assume a schema exists; it looks up the correct schema at the beginning of every request and creates a connection scoped to that schema. The success of this model relies on the guarantee that the tenants.service.js has already run and correctly created the schema and all its tables when the tenant was first registered.

## 3. Data Model

The application follows a hierarchical data model:

*   **Tenant:** The top-level entity, representing a company or organization.
    *   Each tenant is isolated, meaning a tenant's data is not accessible to other tenants.
    *   Tenant registration requires a validated secure token.
    *   Each tenant's schema name contains 'ORG_' followed by the first three letters of the    company name. For example if the user enters Acme LLC., teh schema name wodl be ORG_ACM.
    *   If the company name contains space or special characters, a regex function needs to 
    *   handle that accordingly by removing spaces and special characters. If the sapce is 
    *   betwene the second and thirs charters of the companyname, the regex sould insert X in 
    *   its place. For Ax LLC., the schema name should be ORG_AXX.
*   **Location:** Each tenant can have multiple locations or branches.
*   **User:** Each location can have up to 2000 users.
    *   Users are associated with a specific tenant and location.
    *   User registration requires a secure token.
*   **Client:** Each user can have multiple clients.
*   **Activity:** Each client can engage in multiple activities. An activity includes operational data such as:
    *   A list of items that need to be completed to start a business.
    *   A list of capital expenses.
    *   A list of operational expenses.
    *   A list of products and prices.
    *   Cost of goods or services sold.
    *   Seasonality factors.
    *   Sales projections.
    *   Balance sheet and other financial data.
*   **BusinessPlan:** Each client can have multiple business plans. A business plan includes strategic information such as:
    *   Mission statement.
    *   Marketing strategy.
    *   Other business strategies.
    *   This entity is kept separate from `Activity` to distinguish between strategic planning and operational activities.

## 4. Technical Stack

- **Backend:** Firebase (Authentication, Hosting)
- **Frontend:** React, Next.js (with App Router for Server-Side Rendering)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (utility-first approach)
- **Database:** Cloud Firestore for user data.
- **Authentication:** Firebase Authentication with Google Sign-In, email/password, and OTP.
- **Next.js App Router:** The project is structured using the Next.js App Router, with pages and layouts organized in the `/app` directory.
- **Firebase Integration:** The application is connected to a Firebase project for backend services.

## 5. Implemented Features & Design

This section outlines all the features and design elements that have been implemented in the application from the initial version to the current state.

## 6. **Database Schema (PostgreSQL)**

This section contains the database tables structure for the project. The backend service should ensure this schema is created in the database.

tenants
- tenant_id (PK, UUID)
- name (VARCHAR)
- subdomain (VARCHAR, UNIQUE) -- for tenant isolation
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- status (ENUM: active, suspended, inactive)
- settings (JSONB) -- tenant-specific configurations

locations
- location_id (PK, UUID)
- tenant_id (FK -> tenants, INDEXED)
- name (VARCHAR)
- address (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- status (ENUM: active, inactive)
- CONSTRAINT: UNIQUE(tenant_id, name)

users
- user_id (PK, UUID)
- tenant_id (FK -> tenants, INDEXED)
- location_id (FK -> locations, INDEXED, NULLABLE)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR) -- use bcrypt/argon2
- first_name (VARCHAR)
- last_name (VARCHAR)
- role (ENUM: admin, manager, user)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- last_login (TIMESTAMP)
- status (ENUM: active, inactive, suspended)
- CONSTRAINT: CHECK location belongs to same tenant

clients
- client_id (PK, UUID)
- user_id (FK -> users, INDEXED)
- tenant_id (FK -> tenants, INDEXED) -- denormalized for faster queries
- name (VARCHAR)
- business_type (VARCHAR)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- status (ENUM: active, archived)

activities
- activity_id (PK, UUID)
- client_id (FK -> clients, INDEXED)
- tenant_id (FK -> tenants, INDEXED) -- denormalized
- name (VARCHAR)
- description (TEXT)
- status (ENUM: draft, in_progress, completed)
- start_date (DATE)
- target_completion_date (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

activity_startup_items
- item_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- title (VARCHAR)
- description (TEXT)
- is_completed (BOOLEAN)
- completion_date (DATE, NULLABLE)
- order_index (INTEGER)
- created_at (TIMESTAMP)

activity_capital_expenses
- expense_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- category (VARCHAR)
- description (TEXT)
- amount (DECIMAL(15,2))
- expense_date (DATE)
- payment_status (ENUM: pending, paid, financed)
- notes (TEXT)
- created_at (TIMESTAMP)

activity_operational_expenses
- expense_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- category (VARCHAR)
- description (TEXT)
- amount (DECIMAL(15,2))
- frequency (ENUM: one_time, daily, weekly, monthly, quarterly, yearly)
- start_date (DATE)
- end_date (DATE, NULLABLE)
- created_at (TIMESTAMP)

activity_products
- product_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- name (VARCHAR)
- description (TEXT)
- sku (VARCHAR)
- category (VARCHAR)
- price (DECIMAL(15,2))
- cost (DECIMAL(15,2))
- unit (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

activity_cogs
- cogs_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- product_id (FK -> activity_products, NULLABLE, INDEXED)
- category (VARCHAR)
- description (TEXT)
- cost_per_unit (DECIMAL(15,2))
- quantity (DECIMAL(10,2))
- total_cost (DECIMAL(15,2))
- period_start (DATE)
- period_end (DATE)
- created_at (TIMESTAMP)

activity_sales_projections
- projection_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- product_id (FK -> activity_products, NULLABLE, INDEXED)
- period_start (DATE)
- period_end (DATE)
- projected_units (DECIMAL(10,2))
- projected_revenue (DECIMAL(15,2))
- projection_basis (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

activity_balance_sheets
- balance_sheet_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- as_of_date (DATE)
- assets_current (DECIMAL(15,2))
- assets_fixed (DECIMAL(15,2))
- assets_total (DECIMAL(15,2))
- liabilities_current (DECIMAL(15,2))
- liabilities_long_term (DECIMAL(15,2))
- liabilities_total (DECIMAL(15,2))
- equity_total (DECIMAL(15,2))
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

activity_financial_data
- financial_data_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- data_type (VARCHAR) -- income_statement, cash_flow, etc.
- period_start (DATE)
- period_end (DATE)
- data (JSONB) -- flexible structure for various financial metrics
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

business_plans
- plan_id (PK, UUID)
- activity_id (FK -> activities, INDEXED)
- tenant_id (FK -> tenants, INDEXED)
- user_id (FK -> users, INDEXED)
- title (VARCHAR)
- version (INTEGER) -- for version control
- status (ENUM: draft, in_review, finalized, archived)
- template_id (FK -> business_plan_templates, NULLABLE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- finalized_at (TIMESTAMP, NULLABLE)
- language (VARCHAR) -- en, es, fr, etc.

business_plan_templates
- template_id (PK, UUID)
- tenant_id (FK -> tenants, NULLABLE) -- NULL for global templates
- name (VARCHAR)
- description (TEXT)
- category (VARCHAR) -- 'startup', 'loan', 'investor', 'grant'
- structure (JSONB) -- defines sections and their order
- is_active (BOOLEAN)
- is_global (BOOLEAN) -- available to all tenants
- created_by (FK -> users)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

business_plan_sections
- section_id (PK, UUID)
- plan_id (FK -> business_plans, INDEXED)
- section_type (VARCHAR) -- 'executive_summary', 'market_analysis', etc.
- title (VARCHAR)
- content (TEXT) -- rich text/markdown
- order_index (INTEGER)
- is_completed (BOOLEAN)
- data_sources (JSONB) -- references to activity data used
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

business_plan_content_blocks
- block_id (PK, UUID)
- section_id (FK -> business_plan_sections, INDEXED)
- block_type (ENUM: text, table, chart, image, financial_table)
- content (JSONB) -- flexible structure for different block types
- data_binding (JSONB) -- maps to activity data fields
- order_index (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

business_plan_exports
- export_id (PK, UUID)
- plan_id (FK -> business_plans, INDEXED)
- user_id (FK -> users, INDEXED)
- format (ENUM: pdf, docx, html, pptx)
- file_url (VARCHAR) -- S3/R2 location
- file_size (BIGINT)
- generation_status (ENUM: pending, processing, completed, failed)
- error_message (TEXT, NULLABLE)
- expires_at (TIMESTAMP) -- for temporary download links
- created_at (TIMESTAMP)

business_plan_collaborators
- collaboration_id (PK, UUID)
- plan_id (FK -> business_plans, INDEXED)
- user_id (FK -> users, INDEXED)
- permission_level (ENUM: view, comment, edit, admin)
- invited_by (FK -> users)
- created_at (TIMESTAMP)

business_plan_comments
- comment_id (PK, UUID)
- plan_id (FK -> business_plans, INDEXED)
- section_id (FK -> business_plan_sections, NULLABLE, INDEXED)
- user_id (FK -> users, INDEXED)
- parent_comment_id (FK -> business_plan_comments, NULLABLE) -- for threading
- content (TEXT)
- is_resolved (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

business_plan_ai_suggestions
- suggestion_id (PK, UUID)
- plan_id (FK -> business_plans, INDEXED)
- section_id (FK -> business_plan_sections, INDEXED)
- suggestion_type (VARCHAR) -- 'content', 'improvement', 'data_insight'
- content (TEXT)
- is_applied (BOOLEAN)
- applied_at (TIMESTAMP, NULLABLE)
- created_at (TIMESTAMP)

audit_logs
- audit_id (PK)
- tenant_id (INDEXED)
- user_id (INDEXED)
- action (VARCHAR)
- entity_type (VARCHAR)
- entity_id (UUID)
- old_values (JSONB)
- new_values (JSONB)
- ip_address (VARCHAR)
- created_at (TIMESTAMP)

user_sessions
- session_id (PK)
- user_id (FK, INDEXED)
- tenant_id (INDEXED)
- token_hash (VARCHAR)
- expires_at (TIMESTAMP)
- created_at (TIMESTAMP)

## **Critical Composite Indexes for Performance**

CREATE INDEX idx_users_tenant_location ON users(tenant_id, location_id);
CREATE INDEX idx_clients_user_tenant ON clients(user_id, tenant_id);
CREATE INDEX idx_activities_client_tenant ON activities(client_id, tenant_id);
CREATE INDEX idx_activity_details_activity ON activity_capital_expenses(activity_id);

### 7. Authentication

- **Unified Auth Context:** A centralized `AuthContext` (`src/context/AuthContext.tsx`) manages all authentication-related logic, including login, signup, Google Sign-In, and logout. This context is provided to the entire application via the root layout (`src/app/layout.tsx`).
-   **Authentication Flow:**
    -   A user can sign in or sign up on the `/login` page using email/password or their Google account.
    -   Upon successful authentication, they are redirected to the `/dashboard`.
    -   The application uses a robust, context-based authentication model to manage user sessions.
- **Email Verification:** New users who sign up with an email and password are automatically sent a verification link. They must click this link to verify their email address before they can log in.
- **Password Confirmation:** The registration form includes a password confirmation field to prevent users from creating accounts with a typo in their password.
- **Protected Routes:** All pages under `/dashboard` are protected by a `ProtectedLayout` (`src/app/dashboard/ProtectedLayout.tsx`). Unauthenticated users are automatically redirected to the `/login` page.
- **Two-Factor Authentication (OTP) with Recovery Codes:**
    -   Users can enable 2FA on the `/dashboard/security` page.
    -   **Setup Process:**
        1.  A unique OTP secret is generated for the user and stored in Firestore.
        2.  A QR code is displayed for the user to scan with an authenticator app.
        3.  The user enters a 6-digit code from their app to verify and enable 2FA.
    -   **Recovery Codes:**
        1. Upon enabling 2FA, the user can generate a set of 8, single-use recovery codes.
        2. These codes can be used to log in if the user loses access to their authenticator device.
        3. The codes are displayed with options to copy or download.
    -   **Multi-Step Login:** If a user has 2FA enabled, they are prompted to enter an OTP code or a recovery code after successful password verification.
    -   **Server-Side Verification:** All OTP and recovery code logic is securely handled on the server via Next.js API routes.

### 8. User Interface & Design

- **Login Page:** A modern, responsive login/signup page with a multi-step process for 2FA, a dedicated confirmation screen for email verification, and a password confirmation field.
- **Dashboard:** A central dashboard serves as the main user workspace after login. It features a personalized welcome message, a sidebar for navigation, and interactive widgets for key application features (Financial Ratios, Projections, Charts, and Knowledge Base).
- **Security Page:** A dedicated page for managing security settings, including 2FA setup and recovery code generation.
- **Styling:** The UI is built with Tailwind CSS, using a consistent dark theme and a utility-first approach for a clean and modern design. Components are designed to be responsive and accessible.

## 9. User Experience
  **Company Registration** 
  * A user submits the registration form.
  * The frontend calls the POST /register endpoint on the backend.
  * The RegistrationService calls the TenantsService.
  * The createTenantSchema method begins its atomic transaction.
    * If it fails:
    * The transaction is rolled back.
    * A detailed error is logged to the server console for debugging.
    * The InternalServerErrorException is thrown.
    * NestJS catches this and sends a clean, user-friendly JSON error response to the frontend with a 500 status code:

## 10. Current Plan: Implementing Secure Registration
 * This section details the plan for the most recent set of changes, which was focused on implementing a secure registration flow with email verification.

**Problem:** The registration process did not verify that a user owned the email they were signing up with, and it lacked a password confirmation field.

**Plan & Steps:**

1.  **Implement Email Verification:**
    -   **File:** `src/context/AuthContext.tsx`
    -   **Action:** Modified the `signup` function to automatically call Firebase's `sendEmailVerification` method after a new user is created.
2.  **Add Password Confirmation:**
    -   **File:** `src/app/login/page.tsx`
    -   **Action:** Added a `confirmPassword` input field and validation logic to the registration form.
3.  **Update the Login/Registration Page:**
    -   **File:** `src/app/login/page.tsx`
    -   **Action:** Redesigned the UI flow to display a confirmation message after registration, instructing the user to check their email and click the verification link. A new UI state (`verify-email`) was added to handle this.

## 11. Logging Module
  * The nest-winston, winston, and winston-daily-rotate-file to the backend project. The last one is crucial for automatically managing log files so they don't grow indefinitely.
  * A Logger Configuration: We will create a centralized configuration for winston that defines two transports:
  * A console transport for easy viewing during local development.
  * A daily rotating file transport that saves logs to a file, creating a new file each day and automatically deleting old ones.

## 12. Style and Design

*   **Aesthetics:** Modern, clean, and professional. The UI will be visually balanced with clean spacing and polished styles.
*   **Color Palette:** A vibrant and energetic color palette will be used to create a visually appealing experience. The primary colors will be shades of blue, with accents of green and orange.
*   **Typography:** Expressive and relevant typography will be used to create a clear visual hierarchy. Font sizes will be varied to emphasize important information.
*   **Iconography:** Modern and interactive icons will be used to enhance user understanding and navigation.
*   **Interactivity:** Interactive elements such as buttons, charts, and graphs will have a subtle glow effect to provide visual feedback to the user.

## 12. Features

*   **User Authentication:** Secure user authentication system with a tabbed interface for registration and login.
*   **Dashboard:**
    *   **Tenant Owner Dashboard:** View information about users and their clients.
    *   **User Dashboard:** View information about their clients and client's activities.
    *   **Biz-Forecaster Owner View:** A "super admin" view with access to information about all tenants and their usage of the application.
*   **Data Visualization:** Interactive charts and graphs for visualizing data and identifying trends.
*   **Trend Analysis:** Tools for analyzing historical data and identifying patterns and trends.
*   **Predictive Modeling:** Predictive modeling tools for forecasting future trends and making informed decisions.
*   **Financial Ratios:**
    *   Calculate and display key financial ratios, including:
        *   Current Ratio
        *   Debt to Equity Ratio
        *   Interest Coverage Ratio
        *   Operating Cash Flow Ratio
        *   Net Profit Margin
*   **Library:**
    *   A dedicated section in the application to provide educational content about financial ratios.
    *   Includes a general introduction to financial ratios and detailed explanations of each ratio.

## 13. Current Development Plan

*   **Phase 1: UI/UX Redesign:**
    *   Redesign the home page to create a visually appealing and intuitive user experience.
    *   Implement a modern and responsive layout that adapts to different screen sizes.
    *   Incorporate the new color palette, typography, and iconography.

*   **Phase 2: Frontend Development:**
    *   Develop the frontend for the user authentication system.
    *   Implement the user dashboard and data visualization components.

*   **Phase 3: Backend Integration:**
    *   Integrate the frontend with the backend API.
    *   Implement the data analysis and predictive modeling features.
