**[GOAL]**
I need the code for the new `biz-forecaster' application in NestJS.

**[MY ROLE / CONTEXT]**
I am the Product Owner. My focus is on ensuring the business logic is correct. Please use clear, standard patterns.
I have strong knowledge of the product requirements and user needs, but I am not a deep expert in the technical implementation. My primary goal is to ensure Fall features work correctly and meets the user story.

**[FUNCTIONALITY / USER STORY]**
Biz-forecaster is a multi-tenant application. Registered tenants may have multiple branches for their operations with many users at each branch. Subscribed users want to be able to provide information about business ideas that their clients have, to biz-forecaster. After inputting information, users would want to create financial projections and sales forecast, and asses the viability of the business idea. The information that the users would provide about thier clients would include, business startup activities, capital and operating expenses, products and services that they offer along with prices, and assests and liabilities. The application would also calculate ratios related to business opertions such as liquidity, solvency, and profitability. The application would create balance sheets and break-even calculations with charts adn graphs for financial information where applicable. The application would include a library of educational material related to business finance. The user may decide to export results to a spreadsheet file with multiple tabs.

**[TECHNICAL REQUIREMENTS]**
1.  **Technology:** Must use the `Subscription` entity with **TypeORM** (Neon PostgreSQL).
2.  **Security:** Must follow all security best practices.
2.  **API:** The pause logic must be implemented in the `SubscriptionService` and exposed via a `PATCH /subscriptions/:id/pause` endpoint.
3.  **Business Logic (Acceptance Criteria):**
    * **IF** the subscription is currently paused, the request must fail with a 400 error: "Subscription is already paused."
    * **WHEN** the subscription is paused, the `next_renewal_date` must be **pushed back by exactly one cycle** (e.g., 30 days for monthly, 1 year for annual).
    * **AFTER** pausing, the `is_paused` flag on the entity must be set to `true`.
    **Authentication & Authorization:**
    * Subscription must be achieved using secure tokens and strong hash values.
    * The Firebase token verification needs to be robust, ensuring no one can bypass the authentication guard.
    * Strong preference is to use OTP.
    * Google Firebase Authentication is an option.
    **Deployment:** The deployment platforms for biz-forecaster must include, A. Vercel, B. Google Cloud (Firebase), C. Azure, D. Netlify.
    **Maintainability:** The code should be easy for the development team to understand and update. Please ensure the code is clean and well-commented so a junior developer can easily maintain it.
    **Error Handling:** The system must handle failures gracefully.


