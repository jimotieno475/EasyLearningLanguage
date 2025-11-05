import { useEffect } from "react";

export default function Signup() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://app.activenow.io/external/signup_form/load_by_js?city_id=&code=RAZqWzuQ4MaYNwUi&proficiency_id=&school_id=16752&signup_form_id=165928&venue_id=&zz=";
    script.async = true;

    const container = document.querySelector(".activenow-form-165928-container");
    if (container) container.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen  justify-center items-start py-12">
      {/* IMPORTANT → do NOT modify these class names */}
      <div className="activenow-form-container activenow-form-165928-container">
        <center>
          <img
            src="https://www.activenow.io/assets/ripple.gif"
            width="100px"
            alt="loading"
          />
        </center>
      </div>
    </div>
  );
}
