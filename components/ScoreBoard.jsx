"use client"
import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"

const page = ({ id }) => {

  const [scoreData, setScoreData] = useState([]);
  const [openDrop, setOpenDrop] = useState(false);
  const [status,setStatus]=useState("");

  const open = () => {
    setOpenDrop(!openDrop)
  }

  const scores = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/getScore/${id}`)
    res = await res.json()
    setScoreData(res.totalData)
    setStatus(res.status);
  }


  useEffect(() => {
    scores();
  }, [scoreData])

  return (
    <section >
      {
        scoreData ? (
          <div className=" w-full lg:w-2/3">
            <h1 className=" text-red-500 px-6">{status}</h1>
            <div className=" bg-green-900 px-6 py-2 text-white flex items-center justify-between">
              <h1>{scoreData[0]?.batTeamDetails?.batTeamName} ({scoreData[0]?.batTeamDetails?.batTeamShortName})</h1>
              <h1 className=" flex items-center gap-4">{scoreData[0]?.scoreDetails?.runs}/{scoreData[0]?.scoreDetails?.wickets} ({scoreData[0]?.scoreDetails?.overs})
                {
                  openDrop ? (<ArrowUp onClick={open} className=" cursor-pointer bg-slate-400 text-white rounded-full p-1" size={18} />) : (<ArrowDown onClick={open} className=" cursor-pointer bg-slate-400 text-white rounded-full p-1" size={18} />)
                }
              </h1>
            </div>
            <div className="w-full">
              <div className=" flex px-6 py-4 bg-slate-200 items-center w-full">
                <span className=" font-bold w-[400px]">Batter</span>
                <span className=" font-bold w-[100px]">R</span>
                <span className=" font-bold w-[100px]">B</span>
                <span className=" font-bold w-[100px]">4s</span>
                <span className=" font-bold w-[100px]">6s</span>
                <span className=" font-bold w-[100px]">SR</span>
              </div>
              {
                scoreData && scoreData[0]?.batTeamDetails?.batsmenData && Object.keys(scoreData[0].batTeamDetails.batsmenData).length > 0 ?
                  Object.values(scoreData[0].batTeamDetails.batsmenData).map((item, index) => (
                    <div key={index}>
                      <div className="flex text-sm px-6 py-1 items-center w-full">
                        <div className=" flex justify-between items-center gap-10 w-[400px] "> 
                          <Link href={"/"} className="font-bold flex gap-8">{item?.batName} {item?.isCaptain && "(C)" } {item?.isKeeper && "(wk)" } </Link>
                          
                          <span className=" text-right mr-9">{item?.outDesc}</span>
                        </div>
                        
                        <span className="font-bold w-[100px]">{item?.runs}</span>
                        <span className="font-bold w-[100px]">{item?.balls}</span>
                        <span className="font-bold w-[100px]">{item?.fours}</span>
                        <span className="font-bold w-[100px]">{item?.sixes}</span>
                        <span className="font-bold w-[100px]">{item?.strikeRate}</span>
                      </div>
                      <hr />
                    </div>

                    
                  ))
                  : <div>No data available</div>
              }

              <div className=" bg-slate-200 px-6 py-4 flex items-center">
                <h1 className=" w-[400px] font-bold">Extra</h1>
                <h1 className=" "><span className=" font-bold">{scoreData[0]?.extrasData?.total}</span> (b {scoreData[0]?.extrasData?.byes}, lb {scoreData[0]?.extrasData?.legByes}, w {scoreData[0]?.extrasData?.wides}, nb {scoreData[0]?.extrasData?.noBalls}, p {scoreData[0]?.extrasData?.penalty})</h1>
              </div>
              <div className=" bg-green-400 px-6 py-4 flex items-center">
                <h1 className=" w-[400px] font-bold">Total</h1>
                <h1 className=" "><span className=" font-bold">{scoreData[0]?.scoreDetails?.runs}-{scoreData[0]?.scoreDetails?.wickets}</span> 
                ({scoreData[0]?.scoreDetails?.overs} Overs, RR:{scoreData[0]?.scoreDetails?.runRate})
                </h1>
              </div>


              <div className=" flex px-6 py-4 bg-slate-200 items-center w-full">
                <span className=" font-bold w-[400px]">Bowlers</span>
                <span className=" font-bold w-[100px]">O</span>
                <span className=" font-bold w-[100px]">M</span>
                <span className=" font-bold w-[100px]">R</span>
                <span className=" font-bold w-[100px]">W</span>
                <span className=" font-bold w-[100px]">NB</span>
                <span className=" font-bold w-[100px]">WD</span>
                <span className=" font-bold w-[100px]">ECO</span>
              </div>
              {
                scoreData && scoreData[0]?.bowlTeamDetails?.bowlersData && Object.keys(scoreData[0].bowlTeamDetails.bowlersData).length > 0 ?
                  Object.values(scoreData[0].bowlTeamDetails.bowlersData).map((item, index) => (
                    <div key={index}>
                      <div className="flex text-sm px-6 py-1 items-center w-full">
                        <div className=" flex justify-between items-center gap-10 w-[400px] "> 
                          <Link href={"/"} className="font-bold flex gap-8">{item?.bowlName} {item?.isCaptain && "(C)" } {item?.isKeeper && "(wk)" } </Link>
                        </div>
                        
                        <span className="font-bold w-[100px]">{item?.overs}</span>
                        <span className="font-bold w-[100px]">{item?.maidens}</span>
                        <span className="font-bold w-[100px]">{item?.runs}</span>
                        <span className="font-bold w-[100px]">{item?.wickets}</span>
                        <span className="font-bold w-[100px]">{item?.no_balls}</span>
                        <span className="font-bold w-[100px]">{item?.wides}</span>
                        <span className="font-bold w-[100px]">{item?.economy}</span>
                      </div>
                      <hr />
                    </div>

                    
                  ))
                  : <div>No data available</div>
              }

              

            </div>
          </div>
        ) :
          (
            <div>
              <h1>Loading...</h1>
            </div>
          )
      }

{
        scoreData ? (
          <div className=" w-full lg:w-2/3 mt-6">
            
            <div className=" bg-green-900 px-6 py-2 text-white flex items-center justify-between">
              <h1>{scoreData[1]?.batTeamDetails?.batTeamName} ({scoreData[1]?.batTeamDetails?.batTeamShortName})</h1>
              <h1 className=" flex items-center gap-4">{scoreData[1]?.scoreDetails?.runs}/{scoreData[1]?.scoreDetails?.wickets} ({scoreData[1]?.scoreDetails?.overs})
                {
                  openDrop ? (<ArrowUp onClick={open} className=" cursor-pointer bg-slate-400 text-white rounded-full p-1" size={18} />) : (<ArrowDown onClick={open} className=" cursor-pointer bg-slate-400 text-white rounded-full p-1" size={18} />)
                }
              </h1>
            </div>
            <div className="w-full">
              <div className=" flex px-6 py-4 bg-slate-200 items-center w-full">
                <span className=" font-bold w-[400px]">Batter</span>
                <span className=" font-bold w-[100px]">R</span>
                <span className=" font-bold w-[100px]">B</span>
                <span className=" font-bold w-[100px]">4s</span>
                <span className=" font-bold w-[100px]">6s</span>
                <span className=" font-bold w-[100px]">SR</span>
              </div>
              {
                scoreData && scoreData[1]?.batTeamDetails?.batsmenData && Object.keys(scoreData[1].batTeamDetails.batsmenData).length > 0 ?
                  Object.values(scoreData[1].batTeamDetails.batsmenData).map((item, index) => (
                    <div key={index}>
                      <div className="flex text-sm px-6 py-1 items-center w-full">
                        <div className=" flex justify-between items-center gap-10 w-[400px] "> 
                          <Link href={"/"} className="font-bold flex gap-8">{item?.batName} {item?.isCaptain && "(C)" } {item?.isKeeper && "(wk)" } </Link>
                          
                          <span className=" text-right mr-9">{item?.outDesc}</span>
                        </div>
                        
                        <span className="font-bold w-[100px]">{item?.runs}</span>
                        <span className="font-bold w-[100px]">{item?.balls}</span>
                        <span className="font-bold w-[100px]">{item?.fours}</span>
                        <span className="font-bold w-[100px]">{item?.sixes}</span>
                        <span className="font-bold w-[100px]">{item?.strikeRate}</span>
                      </div>
                      <hr />
                    </div>

                    
                  ))
                  : <div>No data available</div>
              }
            <div className=" bg-slate-200 px-6 py-4 flex items-center">
                <h1 className=" w-[400px] font-bold">Extra</h1>
                <h1 className=" "><span className=" font-bold">{scoreData[1]?.extrasData?.total}</span> (b {scoreData[1]?.extrasData?.byes}, lb {scoreData[1]?.extrasData?.legByes}, w {scoreData[1]?.extrasData?.wides}, nb {scoreData[1]?.extrasData?.noBalls}, p {scoreData[1]?.extrasData?.penalty})</h1>
              </div>
              <div className=" bg-green-400 px-6 py-4 flex items-center">
                <h1 className=" w-[400px] font-bold">Total</h1>
                <h1 className=" "><span className=" font-bold">{scoreData[1]?.scoreDetails?.runs}-{scoreData[1]?.scoreDetails?.wickets}</span> 
                ({scoreData[1]?.scoreDetails?.overs} Overs, RR:{scoreData[1]?.scoreDetails?.runRate})
                </h1>
              </div>


              <div className=" flex px-6 py-4 bg-slate-200 items-center w-full">
                <span className=" font-bold w-[400px]">Bowlers</span>
                <span className=" font-bold w-[100px]">O</span>
                <span className=" font-bold w-[100px]">M</span>
                <span className=" font-bold w-[100px]">R</span>
                <span className=" font-bold w-[100px]">W</span>
                <span className=" font-bold w-[100px]">NB</span>
                <span className=" font-bold w-[100px]">WD</span>
                <span className=" font-bold w-[100px]">ECO</span>
              </div>
              {
                scoreData && scoreData[1]?.bowlTeamDetails?.bowlersData && Object.keys(scoreData[1].bowlTeamDetails.bowlersData).length > 0 ?
                  Object.values(scoreData[1].bowlTeamDetails.bowlersData).map((item, index) => (
                    <div key={index}>
                      <div className="flex text-sm px-6 py-1 items-center w-full">
                        <div className=" flex justify-between items-center gap-10 w-[400px] "> 
                          <Link href={"/"} className="font-bold flex gap-8">{item?.bowlName} {item?.isCaptain && "(C)" } {item?.isKeeper && "(wk)" } </Link>
                        </div>
                        
                        <span className="font-bold w-[100px]">{item?.overs}</span>
                        <span className="font-bold w-[100px]">{item?.maidens}</span>
                        <span className="font-bold w-[100px]">{item?.runs}</span>
                        <span className="font-bold w-[100px]">{item?.wickets}</span>
                        <span className="font-bold w-[100px]">{item?.no_balls}</span>
                        <span className="font-bold w-[100px]">{item?.wides}</span>
                        <span className="font-bold w-[100px]">{item?.economy}</span>
                      </div>
                      <hr />
                    </div>

                    
                  ))
                  : <div>No data available</div>
              }

            </div>
          </div>
        ) :
          (
            <div>
              <h1>Loading...</h1>
            </div>
          )
      }
    </section>
  )
}

export default page