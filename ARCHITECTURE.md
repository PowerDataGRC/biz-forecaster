**[GOAL]**
The goal is to develop a fully functional multi-tenant `biz-forecaster' application with NestJS as the backend, NextJS for the frontend, and Neon postgreSQL for the backend database.

**[MY ROLE / CONTEXT]**
I am the Product Owner. My focus is on ensuring the business logic is correct. Please use clear, standard patterns.
I have strong knowledge of the product requirements and user needs, but I am not a deep expert in the technical implementation. My primary goal is to ensure all features work correctly and meets the user story. I understand code with limited comprehension and cannot develop code. I expect developed code to adhere best-practices both in principles and in practice.

**[FUNCTIONALITY / USER STORY]**
Biz-forecaster is a multi-tenant application. Registered tenants may have multiple branches for their operations with many users at each branch. Subscribed users want to beil able to provide information about business ideas that their clients have, to biz-forecaster. After inputting information, users would want to create financial projections and sales forecast, and asses the viability of the business idea. The information that the users would provide about thier clients would include, business startup activities, capital and operating expenses, products and services that they offer along with prices, and assests and liabilities. The application would also calculate ratios related to business opertions such as liquidity, solvency, and profitability. The application would create balance sheets and break-even calculations with charts adn graphs for financial information where applicable. The application would include a library of educational material related to business finance. The user may decide to export results to a spreadsheet file with multiple tabs.

**[TECHNICAL REQUIREMENTS]**
1.  **Technology:** Must use the `Subscription` entity with **TypeORM** (Neon PostgreSQL).
2.  **Security Considerations:**
    * HTTPS: Always use HTTPS for all communication between frontend and backend.
    Secret Token Management: Securely store the JWT secret key on the NestJS backend.
    * Token Expiration: Registration token expire after 15 minutes and those need to be regenrated if unused.
    * Cross-Site Scripting (XSS) Prevention: Be mindful of XSS vulnerabilities. HTTP-only cookies for refresh tokens are a strong defense.
    * Cross-Site Request Forgery (CSRF) Prevention: Implement CSRF protection mechanisms, particularly if using session-based authentication or storing tokens in cookies.
    * Input Validation and Sanitization: Validate and sanitize all user inputs on both frontend and backend.
    
2.  **API:** The pause logic must be implemented in the `SubscriptionService` and exposed via a `PATCH /subscriptions/:id/pause` endpoint.

3.  **Business Logic (Acceptance Criteria):**
    * **IF** the subscription is currently paused, the request must fail with a 400 error: "Subscription is already paused."
    * **WHEN** the subscription is paused, the `next_renewal_date` must be **pushed back by exactly one cycle** (e.g., 30 days for monthly, 1 year for annual).
    * **AFTER** pausing, the `is_paused` flag on the entity must be set to `true`.
    **Authentication & Authorization:**
    *  Subscription must be achieved using secure tokens and strong hash values.
    *  The Firebase token verification needs to be robust, ensuring no one can bypass the authentication guard.
    *  Strong preference is to use OTP.
    *  Google Firebase Authentication is an option.
    **Deployment:** The deployment platforms for biz-forecaster must include, A. Vercel, B. Google Cloud (Firebase), C. Azure, D. Netlify.
    **Maintainability:** The code should be easy for the development team to understand and update. Please ensure the code is clean and well-commented so a junior developer can easily maintain it.
    **Error Handling:** The system must handle failures gracefully.
    **Frontend Client Application**
    *  Login/Registration Forms: Provides user interfaces for user authentication.
    *  API Interactions: Sends login/registration requests to the NestJS backend.
    *  Token Storage: Upon receiving a successful login response with a JWT, the Next.js frontend securely stores these tokens.
    *  Registration Token: Stored in a secure client-side storage mechanism (e.g., localStorage or sessionStorage with careful consideration of XSS risks, or more securely in HTTP-only cookies).
    *  Authenticated Requests: Attaches the access token to the Authorization header of subsequent requests to protected NestJS API endpoints.

**[TECHNICAL IMPLEMENTATIONS]**
    **  The schema-factory.service.ts
    *  This file contains a single, focused service with one public method, generateSchemaName, that implements the specific naming rules.

**[SQL Statement to Drop and Create the 'tenans' table]**

-- Drop existing table and type if they exist to ensure a clean start
DROP TABLE IF EXISTS "public"."tenants" CASCADE;
DROP TYPE IF EXISTS "public"."tenants_status_enum";

-- Step 1: Ensure the UUID generation extension is available in the database.
-- This only needs to be run once per database.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Define the custom ENUM type for the tenant status.
-- This ensures data integrity for the 'status' column.
CREATE TYPE "public"."tenants_status_enum" AS ENUM('active', 'suspended', 'inactive');

-- Step 3: Create the 'tenants' table with all columns and constraints defined.
CREATE TABLE "public"."tenants" (
    "tenant_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" character varying NOT NULL,
    "subdomain" character varying NOT NULL,
    "schema_name" character varying NOT NULL,
    "status" "public"."tenants_status_enum" NOT NULL DEFAULT 'active',
    "settings" jsonb,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_tenants_tenant_id" PRIMARY KEY ("tenant_id"),
    CONSTRAINT "UQ_tenants_subdomain" UNIQUE ("subdomain"),
    CONSTRAINT "UQ_tenants_schema_name" UNIQUE ("schema_name")
);

-- Step 4: Create an index on the 'schema_name' column for faster lookups.
CREATE INDEX "IDX_tenants_schema_name" ON "public"."tenants" ("schema_name");
CREATE INDEX "IDX_tenants_schema_name" ON public.tenants ("schema_name");

-- Step 4: Verify the tabel
SELECT to_regclass('public.tenants');

**Base64 ENcoding**
* The Decoder 
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([IO.File]::ReadAllText("C:\PATH_TO_FILE\firebase-adminsdk.json"))) > firebaseSA-base64.txt

The Encoder
[System.IO.File]::WriteAllBytes("Path_to_decoded_file", [System.Convert]::FromBase64String("insert_jumpble_of_decoded_string_here"))


**Test Cases**
*Tsting the registraiton process
    1. Test Scenario 1: Registering with an existing email
    - Steps:
        Open your browser to http://localhost:3000/register
        Enter an email that you know already exists in Firebase
        Enter any password
        Click "Register"
    - Expected Result:
        Should see the error message: "This email address is already registered"
        Should see a suggestion to log in
        Should see a "Go to Login" button
    2. Test Scenario 2: Invalid email format
    - Steps:
        Enter an invalid email (like "test@")
        Enter any password
        Click "Register"
    - Expected Result:
        Should see "Invalid email address" error
    3. Test Scenario 3: Weak password
    - Steps:
        Enter a valid email
        Enter a short password (less than 6 characters)
        Click "Register"
    - Expected Result:
        Should see "Password is too weak" error
        Should see suggestion about using at least 6 characters
    4. Test Scenario 4: Successful registration
    - Steps:
        Enter a new, valid email
        Enter a strong password (at least 6 characters)
        Click "Register"
    - Expected Result:
        Should be redirected to the dashboard page
        No errors should be shown
For each test:

Watch the browser's Network tab to see the API calls
Check the browser's Console for any error messages
Verify that the loading state works (button should show "Registering..." while processing)
