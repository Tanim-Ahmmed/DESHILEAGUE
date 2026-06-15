export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const isOTPValid = (otp: string): boolean => {
  return /^\d{6}$/.test(otp)
}

// In production, integrate with SMS service like Twilio, AWS SNS, etc.
export const sendOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    // Mock implementation - replace with actual SMS service
    console.log(`Sending OTP ${otp} to ${phoneNumber}`)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return true
  } catch (error) {
    console.error("Failed to send OTP:", error)
    return false
  }
}
