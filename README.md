## Live Coding Test: Full-Stack Expense Tracker
**IMPORTANT INSTRUCTIONS - PLEASE READ FIRST**

    You are encouraged to use the internet to look up official documentation (e.g., React Docs, NestJS Docs, MDN, etc.).

    You are stictly NOT permitted to use any AI assistance tools, such as ChatGPT or other similar websites.

    If you have GitHub Copilot, or any similar AI assistance tool enabled in your IDE, please disable it for the duration of this test.

---

Hello! Welcome to our live coding session. We're excited to see your skills in action.

We've provided a working boilerplate application with separate frontend and backend services. Your goal is to integrate these services and then implement a new feature from the UI to the backend.

**Please ask questions! If anything is unclear, or you want to discuss a particular approach, feel free to talk it through with us.**

**Thinking aloud is encouraged.**
<br>
<br>
## Test Details

**Time Limit:** Approximately 25-30 minutes.

**The Goal**
Your mission is to first connect the React frontend to the NestJS backend to display live data. Then, you will build the "Add Expense" feature, which includes creating the UI and implementing the backend logic with security validation.

**Tech Stack**
|||
|---|---|
|Package Manager | Yarn |
|Backend| NestJS (TypeScript)|
Frontend| React (Vite, TypeScript)|
|Styling| Any (Tailwind preferred)|
|API Style |RESTful|
|||

<br>
<br>

## Getting Started
The boilerplate code contains a backend and frontend directory. Both are fully functional.

### 1. Install Dependencies:
Navigate to the root directory and run:

`yarn install`

This will install dependencies for both the frontend and backend.

### 2. Run the Backend:
In a new terminal, navigate to the backend directory and run:

`yarn start:dev`

The backend server will be available at `http://localhost:3000`. It is already configured with an `/expenses` resource that serves mock data.

### 3. Run the Frontend:
In another terminal, navigate to the frontend directory and run:

`yarn dev`

The React application will be available at `http://localhost:5173`. You should see the dashboard UI populated with static data defined within the React component.

<br>
<br>

## Your Tasks

### Part 1: Frontend & Backend Integration
Your first task is to replace the static data in the frontend with real data from the backend.

In `frontend/src/App.tsx`, find the `useEffect` hook.

Modify it to fetch all expenses from the `GET /expenses` backend endpoint.

Update the component's state with the data returned from the API. The dashboard should now display the data served by the backend.

<br>

### Part 2: Implement "Add Expense" Feature
Now, you will build the feature to create new expenses.

1. Frontend (React):

   - In `frontend/src/App.tsx`, add a new **"Add Expense"** button on top of the expense table.

   - Clicking this button should open a modal or an inline form with input fields for "Description" and "Amount".

   - When the form is submitted, it must communicate with the backend to create a new expense.

    The UI must be reactive: after an expense is successfully added, the list on the dashboard should update automatically to show the new item without a page refresh.

2. Backend (NestJS):

    - Navigate to `backend/src/modules/expenses`. Everything you need is already there.

    - Implement the logic in both the `expenses.controller.ts` and `expenses.service.ts` files.
    - **[Recommended]** Test the API endpoint using any HTTP client, such as Postman or Insomnia.

<br>

### Part 3: Add Backend Validation
Finally, secure the create endpoint by adding server-side validation.

1. In `backend/src/modules/expenses/dto`, modify the `create-expense.dto.ts` file.

2. Using `class-validator` decorators, define rules to ensure description is a non-empty string and amount is a positive number.

3. **[Recommended]** Test the validation rules using any HTTP client, such as Postman or Insomnia.

<br>
<br>

---

<br>
<br>

## What We're Looking For

|||
|---|---|
|Full-Stack Fluency:| Your ability to work comfortably across the backend and frontend.|
|API Integration:| Successfully fetching and posting data between services.|
|Reactive UI:| Demonstrating robust state management in React that updates the UI automatically.|
|Security Mindset:| Correctly implementing server-side validation with DTOs in NestJS.|
|Framework Knowledge:| Proper use of NestJS and React conventions.|
|||

<br>
<br>

# Good luck!