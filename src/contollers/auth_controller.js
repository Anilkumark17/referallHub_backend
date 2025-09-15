const db = require("../Db/db");

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) {
      console.log("Supabase signIn error:", error);
      return res.status(401).json({ message: error.message });
    }

    console.log("Supabase user data:", data.user);

    const { data: profileData, error: profileError } = await db
      .from("user_profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      console.log("Profile fetch error:", profileError);
      return res.status(500).json({ message: profileError.message });
    }

    console.log("User role:", profileData.role);

    res.json({
      user: data.user,
      role: profileData.role,
      accessToken: data.session.access_token,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
