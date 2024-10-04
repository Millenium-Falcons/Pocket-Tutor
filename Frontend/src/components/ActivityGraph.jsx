// import React, { useEffect, useState } from 'react';

// const ActivityGraph = ({ loginDates }) => {
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [cellSize, setCellSize] = useState(0);
//   const weeks = 7;

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//       setCellSize((window.innerWidth - 32) / 20); // Adjust cell size based on screen width
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Set initial sizes

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const cells = Array.from({ length: 7 * weeks }, (_, index) => {
//     const cellDate = new Date();
//     cellDate.setDate(cellDate.getDate() - (7 * weeks - index - 1));
//     const dateString = cellDate.toISOString().split('T')[0];
//     const hasLoggedIn = loginDates.includes(dateString);

//     return (
//       <div
//         key={index}
//         style={{
//           width: `${cellSize - 1}px`,
//           height: `${cellSize - 1}px`,
//           backgroundColor: hasLoggedIn ? '#4CAF50' : 'rgba(255, 255, 255, 0.1)', // Green for logged in, transparent for not
//           margin: '0.5px',
//           borderRadius: '2px',
//         }}
//       />
//     );
//   });

//   return (
//     <div
//       className="flex flex-wrap justify-center"
//       style={{ maxWidth: `${screenWidth}px` }}
//     >
//       {cells}
//     </div>
//   );
// };

// export default ActivityGraph;
import React, { useEffect, useState } from 'react';

const ActivityGraph = ({ loginDates }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [cellSize, setCellSize] = useState(0);
  const weeks = 7;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setCellSize((window.innerWidth - 32) / 20); // Adjust cell size based on screen width
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial sizes

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cells = Array.from({ length: 7 * weeks }, (_, index) => {
    const cellDate = new Date();
    cellDate.setDate(cellDate.getDate() - (7 * weeks - index - 1));
    const dateString = cellDate.toISOString().split('T')[0];
    
    console.log({ dateString, loginDates }); // Debugging line to see date comparison

    const hasLoggedIn = loginDates.some(date => date.split('T')[0] === dateString);


    return (
      <div
        key={index}
        style={{
          width: `${cellSize - 1}px`,
          height: `${cellSize - 1}px`,
          backgroundColor: hasLoggedIn ? '#4CAF50' : 'rgba(255, 255, 255, 0.1)', // Green for logged in, transparent otherwise
          margin: '0.5px',
          borderRadius: '2px',
        }}
      />
    );
  });

  return (
    <div
      className="flex flex-wrap justify-center"
      style={{ maxWidth: `${screenWidth}px` }}
    >
      {cells}
    </div>
  );
};

export default ActivityGraph;
