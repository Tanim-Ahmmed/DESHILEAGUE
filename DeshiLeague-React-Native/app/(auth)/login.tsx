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

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // navigation (replace with real API call later)
      router.replace("/(tabs)/managers");
    } catch (error: any) {
      let errorMessage = "Please check your credentials and try again.";
      if (error.response?.data?.error) {
        errorMessage =
          error.response.data.error.message || error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Login Failed", errorMessage);
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
        source={require("@/assets/images/bat.png")}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.scrollContent}
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         >
          <Text style={styles.title}>Login</Text>

          {/* Email Input */}
          <FormInput
            control={control}
            label="Username/Email"
            name="email"
            placeholder="name/email@gmail.com"
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

          {/* Password Input */}
          <FormInput
            control={control}
            label="Password"
            name="password"
            placeholder="************"
            secureTextEntry={!showPassword}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
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
          <View style={styles.forgotRow}>
            <Link href="/" asChild>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <SubmitButton
            title="Login"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#fff" style={styles.socialIcon} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={20} color="#fff" style={styles.socialIcon} />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Create account</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

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
    color: theme.secondaryTextColor,
    marginBottom: 20,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  forgotText: {
    fontSize: 13,
    color: theme.secondaryTextColor,
    textDecorationLine: "underline",
  },
  loginButton:{
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
  loginButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    marginVertical: 20,
    backgroundColor: theme.secondaryTextColor,
  },
  orText: {
    marginHorizontal: 10,
    color: theme.secondaryTextColor,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 18,
    elevation: 5,
  },
  socialIcon: {
    marginLeft: 20,
    marginRight: 10,
  },
  socialText: {
    color: theme.secondaryTextColor,
    fontSize: 15,
    fontWeight: "500",
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
