import React from "react";

// const CarItem = (props) => {
//   console.log("caritem props: ", props.item);
//   const { category, type, rentPrice, imgUrl, carName, groupSize } = props.item;
//   return (
//     <div className="car__item">
//       <div className="car__item-top">
//         <div className="car__item-tile">
//           <h3>{carName}</h3>
//           <span>
//             <i class="ri-heart-line"></i>
//           </span>
//         </div>
//         <p>{category}</p>
//       </div>

//       <div className="car__img">
//         <img src={imgUrl} alt="" />
//       </div>

//       <div className="car__item-bottom">
//         <div className="car__bottom-left">
//           <p>
//             <i class="ri-user-line"></i> {groupSize}
//           </p>
//           <p>
//             <i class="ri-repeat-line"></i>
//             {type}
//           </p>
//         </div>

//         <p className="car__rent">${rentPrice}/d</p>
//       </div>
//     </div>
//   );
// };


const CarItem = (props) => {
  console.log("CarItem received: ", props.item);
  if (!props.item){
    console.error("Error: props.item is undefined or null. ");
  }
  // const { model, fuel_type, total_price, image, make, seat_capacity } = props.item;
  const {make, model, image, seat_capacity, fuel_type, total_price, status
  } = props.item;
  return (
    <div className="car__item">
      <div className="car__item-top">
        <div className="car__item-tile">
          <h3>{make}</h3>
          <span>
            <i class="ri-heart-line"></i>
          </span>
        </div>
        <p>{model}</p>
      </div>

      <div className="car__img">
        <img src={image} alt="" />
      </div>

      <div className="car__item-bottom">
        <div className="car__bottom-left">
          <p>
            <i class="ri-user-line"></i> {seat_capacity}
          </p>
          <p>
            <i class="ri-repeat-line"></i>
            {fuel_type}
          </p>
        </div>

        <p className="car__rent">${total_price}</p>
      </div>
    </div>
  );
};

export default CarItem;
