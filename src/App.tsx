import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import UserLayout from './layouts/UserLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterRolePage from './pages/auth/RegisterRolePage'
import RegisterPage from './pages/auth/RegisterPage'
import HelperListPage from './pages/client/HelperListPage'
import HelperProfilePage from './pages/client/HelperProfilePage'
import FamilyDashboardPage from './pages/family/FamilyDashboardPage'
import RecurringBookingPage from './pages/client/RecurringBookingPage'
import HelperJournalFormPage from './pages/helper/HelperJournalFormPage'
import SessionReportPage from './pages/family/SessionReportPage'
import ChatPage from './pages/chat/ChatPage'
import CheckoutPage from './pages/payment/CheckoutPage'
import PaymentSuccessPage from './pages/payment/PaymentSuccessPage'
import PaymentHistoryPage from './pages/payment/PaymentHistoryPage'
import ReviewPage from './pages/client/ReviewPage'
import HelperDashboardPage from './pages/helper/HelperDashboardPage'
import HelperOnboardingPage from './pages/helper/HelperOnboardingPage'

const queryClient = new QueryClient()

function App() {
  console.log('App component rendering...')
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<FamilyDashboardPage />} />
            <Route path="bookings" element={<RecurringBookingPage />} />
            <Route path="helpers" element={<HelperListPage />} />
            <Route path="helpers/:id" element={<HelperProfilePage />} />
            <Route path="family" element={<div className="font-display text-2xl font-bold">Family Members Page</div>} />
            <Route path="reports/:id" element={<SessionReportPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="profile" element={<div className="font-display text-2xl font-bold">Profile Page</div>} />
            <Route path="settings" element={<div className="font-display text-2xl font-bold">Settings Page</div>} />
            <Route path="payment/history" element={<PaymentHistoryPage />} />
            <Route path="reviews" element={<ReviewPage />} />
          </Route>

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />

          <Route path="/helper" element={<AppLayout />}>
            <Route index element={<HelperDashboardPage />} />
            <Route path="onboarding" element={<HelperOnboardingPage />} />
            <Route path="journal/new" element={<HelperJournalFormPage />} />
          </Route>
          
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register/role" element={<RegisterRolePage />} />
            <Route path="register/form" element={<RegisterPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
