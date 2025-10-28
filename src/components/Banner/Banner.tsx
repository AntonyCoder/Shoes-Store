import banner from "@/assets/img/banner.jpg";
import "./Banner.css";

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <img src={banner} className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
};

export default Banner;
