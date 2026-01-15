# Authentication Flow Implementation

## Overview

This implementation provides a complete authentication flow with email verification and role-based redirection using RTK Query and Sonner for notifications.

## Features

### 1. **User Signup** ([sign-up/page.tsx](<src/app/(auth)/sign-up/page.tsx>))

- User fills registration form with:
  - Full name
  - Business name (optional)
  - Role (operations, marketing_manager, executive)
  - Email
  - Password & Confirm Password
- On successful signup:
  - Success toast notification
  - Email stored in sessionStorage
  - Redirects to OTP verification page

### 2. **Email Verification** ([verify-otp/page.tsx](<src/app/(auth)/verify-otp/page.tsx>))

- User enters 6-digit OTP sent to email
- Features:
  - Auto-focus to next input
  - Paste support for OTP
  - Backspace navigation
- On successful verification:
  - Success toast notification
  - Email removed from sessionStorage
  - Redirects to login page

### 3. **Login** ([login/page.tsx](<src/app/(auth)/login/page.tsx>))

- User enters email and password
- On successful login:
  - Success toast notification
  - Token stored in Redux & cookies
  - User data stored in Redux
  - **Role-based redirection:**
    - Admin → `/admin`
    - Operations → `/dashboard/operations`
    - Marketing Manager → `/dashboard/marketing-manager`
    - Executive → `/dashboard/executive`

## API Endpoints

### Signup

```
POST /auth/signup/
Body: {
  email: string
  full_name: string
  business_name?: string
  role: "operations" | "marketing_manager" | "executive"
  password: string
  confirm_password: string
}
Response: {
  success: true
  message: "Signup successful, verify email"
}
```

### Email Verification

```
POST /auth/verify-email/
Body: {
  email: string
  otp: string
}
Response: {
  success: true
  message: "Email verified"
}
```

### Login

```
POST /auth/login/
Body: {
  email: string
  password: string
}
Response: {
  success: true
  message: "Login successful"
  data: {
    accessToken: string
    refreshToken: string
    user: {
      id: number
      email: string
      full_name: string
      role: "operations" | "marketing_manager" | "executive"
      is_admin: boolean
    }
  }
}
```

## File Structure

```
src/
├── redux/
│   ├── api/
│   │   └── baseApi.ts                 # RTK Query base configuration
│   ├── features/
│   │   └── auth/
│   │       ├── authApi.ts             # Auth API endpoints
│   │       └── authSlice.ts           # Auth state management
│   ├── store.ts                       # Redux store configuration
│   └── StoreProvider.tsx              # Redux provider component
├── app/
│   ├── layout.tsx                     # Root layout with Toaster
│   └── (auth)/
│       ├── sign-up/page.tsx           # Signup page
│       ├── verify-otp/page.tsx        # OTP verification page
│       └── login/page.tsx             # Login page
└── types/
    └── auth.ts                        # TypeScript types
```

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-api-url.com/api
```

### 2. Dependencies

Already installed:

- `@reduxjs/toolkit` - State management
- `react-redux` - Redux React bindings
- `sonner` - Toast notifications

### 3. Redux Store

The store is configured with:

- RTK Query API middleware
- Auth slice reducer
- Token persistence in cookies

## Usage

### Toast Notifications

All authentication actions show toast notifications:

- ✅ Success messages (green)
- ❌ Error messages (red)
- ℹ️ Info messages (blue)

### Protected Routes

After login, users are automatically redirected to their role-specific dashboard. You can use the Redux store to check authentication status:

```tsx
import { useAppSelector } from "@/redux/hooks";

const MyComponent = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token) {
    // Redirect to login
  }

  // Use user data
};
```

### Token Management

- Access token stored in Redux state
- Token also stored in cookies for middleware access
- Token automatically included in API requests via baseQuery

## Testing the Flow

1. **Sign Up**: Go to `/sign-up`

   - Fill the form
   - Click "Signup"
   - You'll see a success toast and redirect to OTP page

2. **Verify Email**: On `/verify-otp`

   - Enter the 6-digit OTP from email
   - Click "Verify"
   - Success toast appears and redirect to login

3. **Login**: On `/login`
   - Enter email and password
   - Click "Login"
   - Success toast appears
   - Redirected to role-based dashboard

## Error Handling

All API errors are caught and displayed as toast notifications with user-friendly messages. The error format from the API is expected to be:

```json
{
  "data": {
    "message": "Error message here"
  }
}
```

## Next Steps

- Implement resend OTP functionality
- Add forgot password flow
- Add token refresh logic
- Add loading states for better UX
- Add form validation messages
- Implement logout functionality
