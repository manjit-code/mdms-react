import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setRole, setUserInfo } from "../../../redux/slices/AuthSlice";

export default function LoginForm() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.colors);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Dummy user data with roles
  const users = [
    { email: "consumer@gmail.com", password: "consumer123", role: "consumer", name: "Consumer User" },
    { email: "zoneuser@gmail.com", password: "zoneuser123", role: "zone", name: "Zone User" },
    { email: "enterpriseuser@gmail.com", password: "enterpriseuser123", role: "enterprise", name: "Enterprise User" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Find matching user
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Store user info and role
      dispatch(setUserInfo({ email: user.email, name: user.name }));
      dispatch(setRole(user.role));

      // Store login timestamp for 60-minute session
      const loginTime = new Date().getTime();
      localStorage.setItem("loginTime", loginTime.toString());

      // Navigate to respective dashboard
      navigate(`/${user.role}/dashboard`);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const fillCredentials = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <div className={`flex h-screen items-center justify-center ${theme.background.primary}`}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 w-[450px]">
        <h1 className={`text-2xl font-semibold ${theme.text.primary}`}>{t('login.login_form')}</h1>

        {error && (
          <div className="w-full px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded-full text-center text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('login.email')}
          className={`rounded-full px-6 py-3 w-full ${theme.input.base} ${theme.input.focus}`}
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.password')}
          className={`rounded-full px-6 py-3 w-full ${theme.input.base} ${theme.input.focus}`}
          required
        />

        <div className="w-full flex justify-between items-center px-2">
          <label className={`flex items-center space-x-2 cursor-pointer ${theme.text.primary}`}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 accent-indigo-600"
            />
            <span>{t('login.remember_me')}</span>
          </label>

          <Link to="/forgot_password" className="text-indigo-600 hover:text-indigo-800 font-medium">
            {t('login.forgot_password')}
          </Link>
        </div>

        <button
          type="submit"
          className={`rounded-full px-8 py-3 w-60 ${theme.button.primary} font-medium transition-all`}
        >
          {t('login.login')}
        </button>

        {/* Dummy credentials display */}
        <div className={`mt-8 w-full p-4 rounded-lg ${theme.background.card} border ${theme.border.primary}`}>
          <h3 className={`text-sm font-semibold mb-3 ${theme.text.primary} text-center`}>
            {t('login.test_credential')}
          </h3>
          <div className="space-y-2 text-xs">
            {users.map((user, index) => (
              <div
                key={index}
                onClick={() => fillCredentials(user.email, user.password)}
                className={`p-2 rounded cursor-pointer ${theme.text.hover} ${theme.border.primary} border`}
              >
                <div className={`${theme.text.primary}`}>
                  <strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}:</strong>
                </div>
                <div className={`${theme.text.secondary}`}>
                  {t('login.email')}: {user.email} | {t('login.password')}: {user.password}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}