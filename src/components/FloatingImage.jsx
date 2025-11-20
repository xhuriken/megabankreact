import React, { useEffect, useState } from "react";

export default function FloatingImage() {
  const [pos, setPos] = useState({ x: 40, y: 40 });
  const [rotation, setRotation] = useState(0);

//calc new random pos
  const randomPosition = () => ({
    x: Math.random() * 80 + 10, 
    y: Math.random() * 80 + 10,
  });

 //calc new random rotation
  const randomRotation = () => Math.random() * 40 - 20; 

  useEffect(() => {
    //set position and rotation of the skeleton every 4 seconds
    const interval = setInterval(() => {
      setPos(randomPosition());
      setRotation(randomRotation());
    }, 4000); //4000  -> 4sec

    //clear
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src="/Calcium.png"
      //Rotation and position smooth is make with the 'transition' class
      className="pointer-events-none fixed w-40 opacity-20 drop-shadow-2xl transition-all duration-[3500ms] ease-in-out"
      //Apply x and y to the style
      style={{
        top: `${pos.y}%`,
        left: `${pos.x}%`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}
