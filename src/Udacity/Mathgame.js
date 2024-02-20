import { useState } from "react";

export default function Mathgame() {
  const [nums, setnums] = useState({
    x: 0,
    y: 0,
    z: 0,
    p: 0,
    userscore: 0,
    totalanswers: 0,
  });

  const generateRandomNumbers = () => {
    const newX = Math.floor(Math.random() * 10);
    const newY = Math.floor(Math.random() * 10);
    const newZ = Math.floor(Math.random() * 10);
    const newP = Math.floor(Math.random() * 10);

    return { x: newX, y: newY, z: newZ, p: newP };
  };

  function random() {
    let newvalues = generateRandomNumbers();
    setnums((prev) => ({
      ...prev,
      ...newvalues,
      totalanswers: nums.totalanswers + 1,
    }));
    if (newvalues.x + newvalues.y + newvalues.z === newvalues.p) {
      setnums((prev) => ({ ...prev, userscore: nums.userscore + 1 }));
    } else {
      console.log("No");
    }
  }

  return (
    <div>
      Is X+Y+Z=P
      {Object.entries(nums).map(([key, value]) => (
        <p>
          {key}={value}
        </p>
      ))}
      <button onClick={random}>Next</button>
    </div>
  );
}
