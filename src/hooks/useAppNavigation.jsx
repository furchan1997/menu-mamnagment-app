import { useNavigate } from "react-router-dom";

// הוק אשר מטפל בניווטים באפליקציה בצורה נוחה עם שימוש בהוק USE NAVIGATE
export const useAppNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const goHome = () => goTo("/");
  const goToCreateDish = () => goTo("/Create-dish");

  return {
    goHome,
    goToCreateDish,
  };
};
