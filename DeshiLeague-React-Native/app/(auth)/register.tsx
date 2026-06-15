import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FormInput, SubmitButton } from "@/components/forms";
import BackButton from "@/components/shared/BackButton";
import theme from "@/constants/theme";

interface RegisterFormData {
  username: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      router.replace("/(auth)/onboading");
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
     <View style={styles.backButtonWrapper}>
        <BackButton onPress={() => router.back()} />
      </View>

      <Image
        source={require("@/assets/images/wicket.png")}
        style={styles.headerImage}
        resizeMode="contain"
      />

      {/* Card */}
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.scrollContent}
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         >
          <Text style={styles.title}>Sign Up</Text>

          {/* Username */}
          <FormInput
            control={control}
            name="username"
            label="Username"
            placeholder="name12"
            rules={{ required: "Username is required" }}
            error={errors.username}
            leftIcon={<Ionicons name="person-outline" size={20} color="#F7F7F7" />}
          />

          {/* Mobile */}
          <FormInput
            control={control}
            name="mobile"
            label="Mobile"
            placeholder="+880"
            keyboardType="phone-pad"
            rules={{
              required: "Mobile number is required",
              minLength: { value: 8, message: "Enter valid mobile number" },
            }}
            error={errors.mobile}
            leftIcon={<Ionicons name="call-outline" size={20} color="#F7F7F7" />}
          />

          {/* Email */}
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="email@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email",
              },
            }}
            error={errors.email}
            leftIcon={<Ionicons name="mail-outline" size={20} color="#F7F7F7" />}
          />

          {/* Password */}
          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="**********"
            secureTextEntry={!showPassword}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            error={errors.password}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#F7F7F7" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#F7F7F7"
                />
              </TouchableOpacity>
            }
          />

          {/* Confirm Password */}
          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="**********"
            secureTextEntry={!showConfirmPassword}
            rules={{
              required: "Confirm Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            }}
            error={errors.confirmPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#F7F7F7" />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#F7F7F7"
                />
              </TouchableOpacity>
            }
          />

          {/* Submit Button */}
          <SubmitButton
            title="Sign Up"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            style={styles.registerButton}
        
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    backButtonWrapper: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerImage: {
    width: "100%",
    height: 180,
    margin: 20,
    alignSelf: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#33373E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  registerButton:{
    backgroundColor: theme.goldenTextDark,
    width: "50%",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,

    shadowColor: theme.goldenTextDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,

    elevation: 6,
  },
  registerButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
    footerText: {
    color: theme.primaryTextColor,
    fontSize: 14,
    fontWeight: "300",
  },
  linkText: {
    color: theme.secondaryTextColor,
    textDecorationLine: "underline",
    fontSize: 14,
    fontWeight: "600",
  },
});
