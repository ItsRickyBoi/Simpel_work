import './Background.css';
import image1 from "/assets/Company1.jpg";
import image2 from "/assets/Company2.jpg";

export const Background = ({heroCount}) => {
  return (
    <div>
        <div>
          <img src={heroCount === 1 ? image1 : image2} alt="Company" className="background-image"/>
        </div>
    </div>
  )
}
