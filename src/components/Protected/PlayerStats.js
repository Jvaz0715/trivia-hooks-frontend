import React, { useContext } from "react";
import { PlayerStatsContext } from "./context/context";

function PlayerStats() {
   const {
      totalPoints,
      wins,
      losses
   } = useContext(PlayerStatsContext);

   return (
      <div className="player-stats-container">
         Total points : {totalPoints}
         <br/>
         Wins: {wins}
         <br/>
         Losses: {losses}
      </div>
   )
};

export default PlayerStats;