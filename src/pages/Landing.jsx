import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Landing(){

  const navigate = useNavigate();

  const {user} = useContext(AuthContext);

  return(
    <div>

      {/* HERO SECTION */}
      <div style={{
        position:"relative",
        minHeight:"100vh",
        backgroundImage:"url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        backgroundSize:"cover",
        backgroundPosition:"center",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>

        <div style={{
          position:"absolute",
          inset:0,
          background:"linear-gradient(to bottom, rgba(10,10,12,0.9), rgba(10,10,12,0.97))"
        }}></div>

        <div style={{
          position:"absolute",
          inset:0,
          background:"radial-gradient(circle at center, rgba(184,155,60,0.18), transparent 65%)"
        }}></div>

        <div style={{
          position:"relative",
          zIndex:2,
          textAlign:"center",
          maxWidth:"950px",
          padding:"40px",
          color:"#ffffff"
        }}>

          <h1 style={{
            fontSize:"72px",
            fontWeight:"500",
            marginBottom:"24px",
            letterSpacing:"1px",
            fontFamily:"Georgia, serif"
          }}>
            Forge Your <span style={{color:"#b89b3c"}}>Fluency</span>
          </h1>

          <p style={{
            fontSize:"20px",
            color:"#d1d1d1",
            lineHeight:"1.7",
            maxWidth:"700px",
            margin:"0 auto 50px auto"
          }}>
            Master languages through intelligent flashcards, deliberate repetition,
            streak tracking, and structured progression.
            Build consistency. Measure growth. Unlock mastery.
          </p>

        <button
  onClick={() => navigate(user ? "/dashboard" : "/signup")}
  style={{
    padding: "16px 44px",
    fontSize: "17px",
    fontWeight: "600",
    background: "#b89b3c",
    border: "none",
    borderRadius: "40px",
    color: "#0e0e10",
    cursor: "pointer",
    boxShadow: "0 0 25px rgba(184,155,60,0.25)"
  }}
>
  {user ? "Go to Dashboard" : "Start Learning"}
</button>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <section style={{
        backgroundColor: "#f5f3ee",
        padding: "100px 20px",
        textAlign: "center"
      }}>

        <h2 style={{
          fontSize: "40px",
          marginBottom: "10px",
          color: "#1a1a1a"
        }}>
          Why Choose <span style={{color:"#b89b3c"}}>FluentForge</span>
        </h2>

        <p style={{
          color: "#666",
          marginBottom: "60px"
        }}>
          Structured mastery. Intelligent repetition. Measurable growth.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
          maxWidth: "1100px",
          margin: "0 auto"
        }}>

          {[
            {
              title:"Smart Flashcards",
              desc:"Learn through intelligent repetition and active recall."
            },
            {
              title:"Streak Tracking",
              desc:"Build daily consistency with motivational streaks."
            },
            {
              title:"Structured Progress",
              desc:"Unlock lessons step-by-step with guided mastery."
            },
            {
              title:"XP & Gamification",
              desc:"Earn XP, measure growth, and stay motivated."
            },
            {
              title:"Performance Insights",
              desc:"Review weak areas and strengthen retention."
            },
            {
              title:"Designed for Focus",
              desc:"Minimal interface. Maximum learning efficiency."
            }
          ].map((item,index)=>(
            <div key={index} style={{
              background:"#ffffff",
              padding:"40px 30px",
              borderRadius:"12px",
              border:"1px solid #e7e2d9",
              boxShadow:"0 8px 25px rgba(0,0,0,0.05)",
              textAlign:"left"
            }}>
              <h3 style={{
                color:"#b89b3c",
                marginBottom:"10px"
              }}>
                {item.title}
              </h3>
              <p style={{
                color:"#444",
                fontSize:"15px"
              }}>
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}