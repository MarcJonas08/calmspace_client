import React, { useState, useRef, useEffect, useContext } from 'react';
import '../css/assessment.css';
import Nav from './nav';
import AuthContext from '../context/AuthContext';


export default function Assessment() {
    return (
        <body>
            <Nav color = 'black' page = 'assessment' rIcon = 'white'/>
            <Assessment_main />
        </body>
    );
}

function Assessment_main (){

    let {authTokens} = useContext(AuthContext);

    useEffect(() => {
      document.body.style.overflow = 'auto';
    }, [])

    //for quiz1

    const [activeQuestion, setActiveQuestion] = useState(0)

    const { questions } = quiz
    const { question, choices } = questions[activeQuestion]

    const [selectedChoices, setSelectedChoices] = useState({
        choice1: null,
        choice2: null,
        choice3: null,
        choice4: null,
        choice5: null,
        choice6: null,
        choice7: null,
        choice8: null,
        choice9: null,
        choice10: null
    });
    
    const [quiz1Score, setQuiz1Score] = useState(null);

    const onClickNext = () => {
        if (selectedChoices[`choice${activeQuestion + 1}`] === null) {
            return;
        }
        setActiveQuestion((prev) => prev + 1)
    }

    const onClickFinish = () => {
        let totalScore =
            parseInt(selectedChoices.choice1) +
            parseInt(selectedChoices.choice2) +
            parseInt(selectedChoices.choice3) +
            parseInt(selectedChoices.choice4) +
            parseInt(selectedChoices.choice5) +
            parseInt(selectedChoices.choice6) +
            parseInt(selectedChoices.choice7) +
            parseInt(selectedChoices.choice8) +
            parseInt(selectedChoices.choice9) +
            parseInt(selectedChoices.choice10);

        setActiveQuestion(0)
        setSelectedChoices({
            choice1: null,
            choice2: null,
            choice3: null,
            choice4: null,
            choice5: null,
            choice6: null,
            choice7: null,
            choice8: null,
            choice9: null,
            choice10: null
        });

        setQuiz1Score(totalScore);
        
        if (totalScore >= 25 && totalScore <= 29) {
            setQ1Result1(true);
            document.body.style.overflow = 'hidden';
        } else if (totalScore >= 20 && totalScore <= 24) {
            setQ1Result2(true);
            document.body.style.overflow = 'hidden';
        } else if (totalScore >= 30 && totalScore <= 40) {
            setQ1Result3(true);
            document.body.style.overflow = 'hidden';
        }
        
        setOpenQuiz1(false)
    }


    const onChoiceClick = (choice) => {
        let num = choices.indexOf(choice) + 2;
        // Update the selected choice for the current question
        setSelectedChoices((prevChoices) => ({
            ...prevChoices,
            [`choice${activeQuestion + 1}`]: num,
        }));
    };

    //for quiz2

    const [activeQuestion2, setActiveQuestion2] = useState(0)
    

    const { questions2 } = quiz2
    const { question2, choices2 } = questions2[activeQuestion2]

    const [selectedChoices2, setSelectedChoices2] = useState({
        choice1: null,
        choice2: null,
        choice3: null,
        choice4: null,
        choice5: null,
        choice6: null,
        choice7: null,
        choice8: null,
        choice9: null,
        choice10: null
    });


    const onClickNext2 = () => {
        if (selectedChoices2[`choice${activeQuestion2 + 1}`] === null) {
            return;
        }
        setActiveQuestion2((prev) => prev + 1)
    }

    const onClickFinish2 = () => {

        let totalScore =
            parseInt(selectedChoices2.choice1) +
            parseInt(selectedChoices2.choice2) +
            parseInt(selectedChoices2.choice3) +
            parseInt(selectedChoices2.choice4) +
            parseInt(selectedChoices2.choice5) +
            parseInt(selectedChoices2.choice6) +
            parseInt(selectedChoices2.choice7) +
            parseInt(selectedChoices2.choice8) +
            parseInt(selectedChoices2.choice9) +
            parseInt(selectedChoices2.choice10);

        setActiveQuestion2(0)
        setSelectedChoices2({
            choice1: null,
            choice2: null,
            choice3: null,
            choice4: null,
            choice5: null,
            choice6: null,
            choice7: null,
            choice8: null,
            choice9: null,
            choice10: null
        });
        
        if (totalScore >= 20 && totalScore <= 24) {
            setQ2Result1(true);
            document.body.style.overflow = 'hidden';
        } else if (totalScore >= 24 && totalScore <= 30) {
            setQ2Result2(true);
            document.body.style.overflow = 'hidden';
        } else if (totalScore >= 31 && totalScore <= 40) {
            setQ2Result3(true);
            document.body.style.overflow = 'hidden';
        }
        
        setOpenQuiz2(false)
    }

    const onChoiceClick2 = (choice) => {
        let num = choices2.indexOf(choice) + 2;
        // Update the selected choice for the current question
        setSelectedChoices2((prevChoices) => ({
            ...prevChoices,
            [`choice${activeQuestion2 + 1}`]: num,
        }));
    };


    //for quiz3

    const [activeQuestion3, setActiveQuestion3] = useState(0)
    

    const { questions3 } = quiz3
    const { question3, choices3 } = questions3[activeQuestion3]

    const [selectedChoices3, setSelectedChoices3] = useState({
        choice1: null,
        choice2: null,
        choice3: null,
        choice4: null,
        choice5: null,
        choice6: null,
        choice7: null,
        choice8: null,
        choice9: null,
        choice10: null
    });
    

    const onClickNext3 = () => {
        if (selectedChoices3[`choice${activeQuestion3 + 1}`] === null) {
            return;
        }
        setActiveQuestion3((prev) => prev + 1)
    }

    const onClickFinish3 = () => {
        let totalScore =
            parseInt(selectedChoices3.choice1) +
            parseInt(selectedChoices3.choice2) +
            parseInt(selectedChoices3.choice3) +
            parseInt(selectedChoices3.choice4) +
            parseInt(selectedChoices3.choice5) +
            parseInt(selectedChoices3.choice6) +
            parseInt(selectedChoices3.choice7) +
            parseInt(selectedChoices3.choice8) +
            parseInt(selectedChoices3.choice9) +
            parseInt(selectedChoices3.choice10);

        setActiveQuestion3(0)
        setSelectedChoices3({
            choice1: null,
            choice2: null,
            choice3: null,
            choice4: null,
            choice5: null,
            choice6: null,
            choice7: null,
            choice8: null,
            choice9: null,
            choice10: null
        });

        
        if (totalScore >= 20 && totalScore <= 24) {
            setQ3Result1(true);
            document.body.style.overflow = 'hidden';
        } else if (totalScore >= 25 && totalScore <= 30) {
            setQ3Result2(true);
            document.body.style.overflow = 'hidden';
        } else if (totalScore >= 31 && totalScore <= 40) {
            setQ3Result3(true);
            document.body.style.overflow = 'hidden';
        }
        
        setOpenQuiz3(false)
    }

    const onChoiceClick3 = (choice) => {
        let num = choices3.indexOf(choice) + 2;
        // Update the selected choice for the current question
        setSelectedChoices3((prevChoices) => ({
            ...prevChoices,
            [`choice${activeQuestion3 + 1}`]: num,
        }));
    };

    //for page interactions
    const [openBg, setOpenBg] = useState(false);

    const[openQuiz1, setOpenQuiz1] = useState(false);
    const[openQuiz2, setOpenQuiz2] = useState(false);
    const[openQuiz3, setOpenQuiz3] = useState(false);


    const handleOpenQuiz1 = () => {
        setOpenQuiz1(true)
        document.body.style.overflow = 'hidden';
    }
    const handleOpenQuiz2 = () => {
        setOpenQuiz2(true)
        document.body.style.overflow = 'hidden';
    }
    const handleOpenQuiz3 = () => {
        setOpenQuiz3(true)
        document.body.style.overflow = 'hidden';
    }


    const [q1Result1, setQ1Result1] = useState(false);
    const [q1Result2, setQ1Result2] = useState(false);
    const [q1Result3, setQ1Result3] = useState(false);

    const [q2Result1, setQ2Result1] = useState(false);
    const [q2Result2, setQ2Result2] = useState(false);
    const [q2Result3, setQ2Result3] = useState(false);

    const [q3Result1, setQ3Result1] = useState(false);
    const [q3Result2, setQ3Result2] = useState(false);
    const [q3Result3, setQ3Result3] = useState(false);

    const [assessmentOpen, setAssessmentOpen] = useState(false);

    const handleAssesOpen = () => {
      setAssessmentOpen(true)
      document.body.style.overflow = 'hidden';
    }
    const handleAssesClose = () => {
      setAssessmentOpen(false)
      document.body.style.overflow = 'auto';
    }

    const handleResultClose = () => {
        setQ1Result1(false)
        setQ1Result2(false)
        setQ1Result3(false)

        setQ2Result1(false)
        setQ2Result2(false)
        setQ2Result3(false)

        setQ3Result1(false)
        setQ3Result2(false)
        setQ3Result3(false)

        document.body.style.overflow = 'auto';
    }

    const handleBgClose = () => {
        setOpenQuiz1(false);
        setOpenQuiz2(false);
        setOpenQuiz3(false);

        setQ1Result1(false)
        setQ1Result2(false)
        setQ1Result3(false)

        setQ2Result1(false)
        setQ2Result2(false)
        setQ2Result3(false)

        setQ3Result1(false)
        setQ3Result2(false)
        setQ3Result3(false)

        setAssessmentOpen(false)

        document.body.style.overflow = 'auto';
    }
    
    const handleQuiz1Close = () => {
        setOpenQuiz1(false)
        document.body.style.overflow = 'auto';
    }

    const handleQuiz2Close = () => {
        setOpenQuiz2(false)
        document.body.style.overflow = 'auto';
    }

    const handleQuiz3Close = () => {
        setOpenQuiz3(false)
        document.body.style.overflow = 'auto';
    }


    const [answers, setAnswers] = useState({
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
    });
  
    const handleChangeGAD7 = (e) => {
      const { name, value } = e.target;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [name]: value,
      }));
    };


    let {user} = useContext(AuthContext);

    const [GADForm, setGADForm] = useState({
      user_id: null,
      AnxietyScore: null
    })

    useEffect(() => {
      let GADscore = parseInt(answers.q1) + parseInt(answers.q2) + parseInt(answers.q3) + parseInt(answers.q4) + parseInt(answers.q5) + parseInt(answers.q6) + parseInt(answers.q7);

      if (GADscore >= 0 && GADscore <= 4){
        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Minimal Anxiety'
        })
      } else if (GADscore >= 5 && GADscore <= 9){
        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Mild Anxiety'
        })
      } else if (GADscore >= 10 && GADscore <= 14){
        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Moderate Anxiety'
        })
      } else if (GADscore >= 15 && GADscore <= 21){
        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Severe Anxiety'
        })
      }
    }, [answers])

  
    const handleSubmitGAD7 = (e) => {
      e.preventDefault();
      
      let GADscore = parseInt(answers.q1) + parseInt(answers.q2) + parseInt(answers.q3) + parseInt(answers.q4) + parseInt(answers.q5) + parseInt(answers.q6) + parseInt(answers.q7);

      if (GADscore >= 0 && GADscore <= 4){

        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Minimal Anxiety'
        })

        setMinimalAnxiety(true)
        setAssessmentOpen(false)

      } else if (GADscore >= 5 && GADscore <= 9){
        
        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Mild Anxiety'
        })

        setMildAnxiety(true)
        setAssessmentOpen(false)

      } else if (GADscore >= 10 && GADscore <= 14){
        
        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Moderate Anxiety'
        })

        setModerateAnxiety(true)
        setAssessmentOpen(false)

      } else if (GADscore >= 15 && GADscore <= 21){
        
        setGADForm({
          user_id: user.user_id,
          AnxietyScore: 'Severe Anxiety'
        })

        setSevereAnxiety(true)
        setAssessmentOpen(false)

      }

      createAssessment();
    };

        let createAssessment = async () => {
          fetch('http://89.116.21.45:8000/api/create/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify(GADForm),
          })
        };

    const [minimalAnxiety, setMinimalAnxiety] = useState(false);
    const [mildAnxiety, setMildAnxiety] = useState(false);
    const [moderateAnxiety, setModerateAnxiety] = useState(false);
    const [severeAnxiety, setSevereAnxiety] = useState(false);

    useEffect(() => {
      const preventDefault = (e) => {
          e.preventDefault();
          window.scrollTo(0, 0);
      };

      if (minimalAnxiety || mildAnxiety || moderateAnxiety || severeAnxiety) {
          window.addEventListener('scroll', preventDefault);
          document.body.style.overflow = 'hidden';
      } else if (!minimalAnxiety || !mildAnxiety || !moderateAnxiety || !severeAnxiety){
          window.removeEventListener('scroll', preventDefault);
          document.body.style.overflow = 'auto';
      }

      // Cleanup function to remove event listener when component unmounts
      return () => {
          window.removeEventListener('scroll', preventDefault);
      };
    }, [minimalAnxiety, mildAnxiety, moderateAnxiety ,severeAnxiety]);


    return(
        <div>
            <div class="bg-img-asses">
                <img src="img/asses-bg.png" />
            </div>
            <div class="hero-asses">
                <div class="hero-img-asses">
                    <img src="img/ol-test.png" />
                </div>
                <div class="hero-cntxt-asses">
                    <h1>Anxiety Test</h1>
                    <p>Evaluate your generalized anxiety symptoms over the past two weeks with the Generalized Anxiety Disorder 7 (GAD-7) test, a quick and effective tool for self-assessment.</p>
                    <a class = "btn-mn" onClick={handleAssesOpen}>Try me</a>
                </div>
            </div>
            <div class="assessments">
                <div class="h1">
                    <h1>Other assessments</h1>
                </div>
                <div class="container-asses">
                    <div class="wrapper-asses">
                        <h2>Career Compatibility Quiz</h2>
                        <p>Discover your ideal career path by answering questions related to your interests, skills, and work preferences. Get personalized insights to guide your career choices.</p>
                        <button onClick={handleOpenQuiz1}>Open</button>
                    </div>
                    <div class="wrapper-asses">
                        <h2>Time Management Quiz</h2>
                        <p>Assess your approach to time management with questions about task prioritization, handling interruptions, and preferred tools. Gain insights to enhance your productivity.</p>
                        <button onClick={handleOpenQuiz2}>Open</button>
                    </div>
                    <div class="wrapper-asses">
                        <h2>Learning Preferences Quiz</h2>
                        <p>Uncover your preferred learning style and strategies for professional development. Identify whether you thrive in structured courses, hands-on experiences, or collaborative learning environments.</p>
                        <button onClick={handleOpenQuiz3}>Open</button>
                    </div>
                </div>
            </div>
            
            <div className='quiz-bg' style={{display: openQuiz1 || openQuiz2 || openQuiz3 || q1Result1 || q1Result2 || q1Result3 || q2Result1 || q2Result2 || q2Result3 || q3Result1 || q3Result2 || q3Result3 ? 'block' : 'none', top: window.scrollY}} onClick={handleBgClose}>
              <div className='close-btn' onClick={handleQuiz2Close}>
                <ion-icon name="close"></ion-icon>
              </div>
            </div>

            {/* Career compatability quiz */}
              <div className='quiz1' style={{display: openQuiz1 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>
                <p>{question}</p>

                <ul>
                    {choices.map((choice, index) => (
                        <li key={index} onClick={() => onChoiceClick(choice)}
                        style={{
                            backgroundImage:
                                selectedChoices[`choice${activeQuestion + 1}`] === choices.indexOf(choice) + 2
                                    ? 'linear-gradient(to right, #5d9add, #9294f2)'
                                    : '', color: selectedChoices[`choice${activeQuestion + 1}`] === choices.indexOf(choice) + 2
                                    ? 'white' : 'black'
                        }}  >{choice}</li>
                    ))}
                </ul>

              <button onClick={activeQuestion < questions.length - 1 ? onClickNext : onClickFinish}>{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'} </button>
            </div>
            <div className='quiz1-result' style={{display: q1Result1 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/Creative.png'/>
                <p>Wow! Your strengths align with a balance between structure and creativity.</p>
                <div className='career-eg'>
                    <p>Here are some examples of career that are aligned with you strengths:</p><br />
                    <ul>
                        <li><strong>Project Manager:</strong> Coordinate and manage projects, balancing structure and creativity.</li>
                        <li><strong>UX/UI Designer:</strong> Design user experiences and interfaces with a blend of creativity and usability.</li>
                        <li><strong>Architect:</strong> Plan and design structures, combining creativity with precision and adherence to regulations.</li>
                        <li><strong>Event Planner:</strong> Organize events with attention to detail and creative flair.</li>
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            <div className='quiz1-result' style={{display: q1Result2 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/Innovation.png'/>
                <p>Wow! Your preferences suggest a strong inclination towards creative and innovative roles.</p>
                <div className='career-eg'>
                    <p>Here are some examples of career that are aligned with you strengths:</p><br />
                    <ul>
                        <li><strong>Graphic Designer:</strong> Create visually appealing designs for various media.</li>
                        <li><strong>Software Developer &lpar;Innovative Projects&rpar;:</strong> Contribute to cutting-edge technology and software development.</li>
                        <li><strong>Marketing Specialist  &lpar;Creative Campaigns &rpar;:</strong> Develop and implement creative marketing campaigns.</li>
                        <li><strong>Innovation Manager:</strong> Lead efforts to introduce new ideas and processes within an organization.</li>
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            <div className='quiz1-result' style={{display: q1Result3 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/collab.png'/>
                <p>Wow! You may thrive in roles that emphasize collaboration, teamwork, and building positive relationships.</p>
                <div className='career-eg'>
                    <p>Here are some examples of career that are aligned with you strengths:</p><br />
                    <ul>
                        <li><strong>Human Resources Manager:</strong> Foster a positive work culture and handle employee relationships.</li>
                        <li><strong>Sales Manager:</strong> Lead a sales team, emphasizing collaboration and positive client relationships.</li>
                        <li><strong>Nonprofit Program Manager:</strong> Coordinate and collaborate on programs for positive community impact.</li>
                        <li><strong>Customer Success Manager:</strong> Build and maintain positive relationships with clients for mutual success.</li>
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            {/* Career compatability quiz */}

            {/* Time management quiz */}
            <div className='quiz1' style={{display: openQuiz2 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>
                <p>{question2}</p>

                <ul>
                    {choices2.map((choice, index) => (
                        <li key={index} onClick={() => onChoiceClick2(choice)}
                        style={{
                            backgroundImage:
                                selectedChoices2[`choice${activeQuestion2 + 1}`] === choices2.indexOf(choice) + 2
                                    ? 'linear-gradient(to right, #5d9add, #9294f2)'
                                    : '', color: selectedChoices2[`choice${activeQuestion2 + 1}`] === choices2.indexOf(choice) + 2
                                    ? 'white' : 'black'
                        }}  >{choice}</li>
                    ))}
                </ul>

                <button onClick={activeQuestion2 < questions2.length - 1 ? onClickNext2 : onClickFinish2}>{activeQuestion2 === questions2.length - 1 ? 'Finish' : 'Next'} </button>
            </div>
            <div className='quiz1-result' style={{display: q2Result1 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/strat.png'/>
                <p>Wow! Your strengths align with a balance between individual goal-setting and collaboration with others.</p>
                <div className='career-eg'>
                    <p>Here are some examples of career that are aligned with you strengths:</p><br />
                    <ul>
                        <li><strong>Flexibility and Collaboration:</strong> Your strengths align with a balance between individual goal-setting and collaboration with others. Embrace flexibility in your approach and be open to collaborative strategies.</li>
                        <li><strong>Diverse Tools:</strong> Explore a mix of time management tools, combining individual planning tools with those that facilitate collaboration and goal alignment within a team.</li>
                        <li><strong>Reflective Practices:</strong> Periodically reflect on your progress and adjust long-term goals. This reflective approach will enhance your ability to adapt to changing circumstances.</li>
                        
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            <div className='quiz1-result' style={{display: q2Result2 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/collaboration.png'/>
                <p>Wow! Your preferences suggest a strong inclination towards individual goal-setting and strategic planning.</p>
                <div className='career-eg'>
                    <p>Here are some examples of career that are aligned with you strengths:</p><br />
                    <ul>
                        <li><strong>Individual Planning:</strong> Your preferences suggest a strong inclination towards individual goal-setting and strategic planning. Continue leveraging your organizational skills to set clear objectives and deadlines.</li>
                        <li><strong>Effective Tools: </strong> Explore time management tools that align with your structured approach, such as calendars, reminders, and project management apps.</li>
                        <li><strong>Continuous Improvement:</strong> Regularly review your time management strategies, making adjustments as needed. This ensures efficiency and adaptability in your workflow.</li>
              
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            <div className='quiz1-result' style={{display: q2Result3 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/time.png'/>
                <p>Wow! You may thrive in collaborative environments where time management involves coordinating efforts with a team.</p>
                <div className='career-eg'>
                    <p>Here are some examples of career that are aligned with you strengths:</p><br />
                    <ul>
                        <li><strong>Team Coordination:</strong> You may thrive in collaborative environments where time management involves coordinating efforts with a team. Foster a culture of open communication and shared goals within your team.</li>
                        <li><strong>Collaborative Tools: </strong> Utilize project management and team collaboration tools to streamline communication and enhance collective time management.</li>
                        <li><strong>Peer Support: </strong> Establish peer mentoring relationships where team members support each other's time management. This shared approach can lead to mutual success and achievement.</li>
                
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            {/* Time management quiz */}

            {/* learning preference quiz */}
            <div className='quiz1' style={{display: openQuiz3 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>
                <p>{question3}</p>

                <ul>
                    {choices3.map((choice, index) => (
                        <li key={index} onClick={() => onChoiceClick3(choice)}
                        style={{
                            backgroundImage:
                                selectedChoices3[`choice${activeQuestion3 + 1}`] === choices3.indexOf(choice) + 2
                                    ? 'linear-gradient(to right, #5d9add, #9294f2)'
                                    : '', color: selectedChoices3[`choice${activeQuestion3 + 1}`] === choices3.indexOf(choice) + 2
                                    ? 'white' : 'black'
                        }}  >{choice}</li>
                    ))}
                </ul>

                <button onClick={activeQuestion3 < questions3.length - 1 ? onClickNext3 : onClickFinish3}>{activeQuestion3 === questions3.length - 1 ? 'Finish' : 'Next'} </button>
            </div>
            <div className='quiz1-result' style={{display: q3Result1 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/personal-growth.png'/>
                <p>Wow! Your strengths align with a balance between exploration and personal growth.</p>
                <div className='career-eg'>
                    <p>Here are some advice for your learning:</p><br />
                    <ul>
                        <li><strong>Diversify Your Learning:</strong> Explore a variety of learning resources, including online platforms, books, and workshops. Embrace the opportunity to learn new things outside your immediate field, fostering a well-rounded skill set.</li>
                        <li><strong>Create a Learning Journal:</strong> Keep a journal to document your learning journey. Reflect on the skills and knowledge you acquire, and identify patterns or themes that align with your personal interests and growth.</li>
                        <li><strong>Networking Events:</strong> Attend industry conferences and networking events. Engage in conversations with professionals from diverse backgrounds to broaden your perspectives and discover new areas of interest.</li>
                        
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            <div className='quiz1-result' style={{display: q3Result2 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/career.png'/>
                <p>Wow! Your preferences suggest a focus on structured learning and career advancement.</p>
                <div className='career-eg'>
                    <p>Here are some advice for your learning:</p><br />
                    <ul>
                        <li><strong>Consider Formal Training Programs:</strong> Enroll in formal training programs, workshops, or online courses that align with your career goals. Look for certifications that can enhance your skills and contribute to your professional development.</li>
                        <li><strong>Set Clear Learning Goals:</strong> Define specific learning goals for yourself, focusing on acquiring skills that will contribute to your career advancement. Break down these goals into manageable steps to track your progress.</li>
                        <li><strong>Seek Mentorship:</strong> Identify mentors within your industry who can provide guidance and insights. Mentors can offer valuable advice on navigating your career path and share their experiences to help you make informed decisions.</li>
                        
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            <div className='quiz1-result' style={{display: q3Result3 ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>  
                <img src='/img/collective.png'/>
                <p>Wow! You may thrive in collaborative learning environments, valuing both personal and collective development.</p>
                <div className='career-eg'>
                    <p>Here are some advice for your learning:</p><br />
                    <ul>
                        <li><strong>Join Professional Groups:</strong> Participate in professional organizations or online communities where collaborative learning is encouraged. Engage with peers, share insights, and contribute to discussions to foster collective knowledge.</li>
                        <li><strong>Collaborative Projects:</strong> Seek opportunities for collaborative projects or team-based learning experiences. This could involve working on cross-functional teams or participating in group initiatives that allow for shared learning and growth.</li>
                        <li><strong>Peer Mentoring:</strong> Establish peer mentoring relationships where you and a colleague mutually support each other's learning journeys. This collaborative approach can provide different perspectives and a shared sense of achievement.</li>
                        
                    </ul>
                </div>
                <button onClick={handleResultClose}>Close</button>
            </div>
            {/* learning preference quiz */}

            <div className="gad7-form" style={{display: assessmentOpen ? 'flex' : 'none', top: `calc(50% + ${window.scrollY}px)`}}>
                <div className='close-btn' onClick={handleAssesClose}>
                    <ion-icon name="close"></ion-icon>
                </div>
              <p>Generalised Anxiety Disorder Assessment (GAD-7&)</p>
              <form onSubmit={handleSubmitGAD7}>
                <p>
                  Over the last 2 weeks, how often have you been bothered by the following problems?
                </p>

              <div className="question">
                <label>Feeling nervous, anxious, or on edge:</label>
                <select name="q1" value={answers.q1} onChange={handleChangeGAD7} required>
                  <option value="">Select</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="question">
                <label>Not being able to stop or control worrying:</label>
                <select name="q2" value={answers.q2} onChange={handleChangeGAD7} required>
                  <option value="">Select</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="question">
                <label>Worrying too much about different things:</label>
                <select name="q3" value={answers.q3} onChange={handleChangeGAD7} required>
                  <option value="">Select</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="question">
                <label>Trouble relaxing:</label>
                <select name="q4" value={answers.q4} onChange={handleChangeGAD7} required>
                  <option value="">Select</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="question">
                <label>Being so restless that it's hard to sit still:</label>
                <select name="q5" value={answers.q5} onChange={handleChangeGAD7} required>
                  <option value="">Select</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="question">
                <label>Becoming easily annoyed or irritable:</label>
                <select name="q6" value={answers.q6} onChange={handleChangeGAD7} required>
                  <option value="">Select</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <div className="question">
                <label>Feeling afraid, as if something awful might happen:</label>
                <select name="q7" value={answers.q7} onChange={handleChangeGAD7} required>
                  <option value="">Select</option>
                  <option value="0">Not at all</option>
                  <option value="1">Several days</option>
                  <option value="2">More than half the days</option>
                  <option value="3">Nearly every day</option>
                </select>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>

          <div className='GAD-result-container' style={{display: minimalAnxiety ? 'flex' : 'none', top: `${window.scrollY}px`}}>
            <div className='close-btn' onClick={() => {setMinimalAnxiety(false)}}>
              <ion-icon name="close"></ion-icon>
            </div>
            <img src='/img/Appreciation-amico.png'></img>
            <div className='GAD-main-text'>
              <p>Hey! It's good to hear that you only have <strong>MINIMAL ANXIETY</strong></p>
              <p>People may experience minimal anxiety from time to time, often stemming from various stressors or life events. 
                It's a natural response to certain situations and can even serve as a protective mechanism. 
                However, it's important to acknowledge. Here are some recommendations to ease your anxiety:
              </p>
            </div>
            <div className='GAD-links'>
              <div className='GAD-to-exerc'>
                <p>We recommend trying out these games/exercises of ours</p>
                <button>Exercises</button>
              </div>
              <div className='GAD-mid'></div>
              <div className='GAD-to-clinic'>
                <p>This is optional but we are always here if you need us</p>
                <button>Book an appointment</button>
              </div>
            </div>
          </div>

          <div className='GAD-result-container' style={{display: mildAnxiety ? 'flex' : 'none', top: `${window.scrollY}px`}}>
            <div className='close-btn' onClick={() => {setMildAnxiety(false)}}>
              <ion-icon name="close"></ion-icon>
            </div>
            <img src='/img/Community-rafiki.png'></img>
            <div className='GAD-main-text'>
              <p>Hey! It seems like you have a <strong>MILD ANXIETY</strong></p>
              <p>Many people experience mild anxiety from time to time, which can stem from various stressors or life events. 
                It's a natural response to certain situations and can even serve as a protective mechanism. However, it's still important
                to consider this thing. So, here are some recommendation to ease your anxiety:</p>
            </div>
            <div className='GAD-links'>
              <div className='GAD-to-exerc'>
                <p>We recommend trying out these games/exercises of ours</p>
                <button>Exercises</button>
              </div>
              <div className='GAD-mid'></div>
              <div className='GAD-to-clinic'>
                <p>Keep in mind that you can always seek assistance from our reliable mental health professionals</p>
                <button>Book an appointment</button>
              </div>
            </div>
          </div>

          <div className='GAD-result-container' style={{display: moderateAnxiety ? 'flex' : 'none', top: `${window.scrollY}px`}}>
            <div className='close-btn' onClick={() => {setModerateAnxiety(false)}}>
              <ion-icon name="close"></ion-icon>
            </div>
            <img src='/img/True friends-pana.png'></img>
            <div className='GAD-main-text'>
              <p>Hey! I'm worried that you might have a <strong>MODERATE ANXIETY</strong></p>
              <p>Moderate anxiety, characterized by persistent worry and difficulty concentrating, can significantly impact daily life. 
                Seeking support from mental health professionals is crucial in managing these challenges effectively. 
                Remember, reaching out for help is a proactive step towards finding balance and peace in your life.</p>
            </div>
            <div className='GAD-links'>
              <div className='GAD-to-exerc'>
                <p>We recommend trying out these games/exercises of ours</p>
                <button>Exercises</button>
              </div>
              <div className='GAD-mid'></div>
              <div className='GAD-to-clinic'>
                <p>We highly recommend you to have a seat with us and talk for a while</p>
                <button>Book an appointment</button>
              </div>
            </div>
          </div>

          <div className='GAD-result-container' style={{display: severeAnxiety ? 'flex' : 'none', top: `${window.scrollY}px`}}>
            <div className='close-btn' onClick={() => {setSevereAnxiety(false)}}>
              <ion-icon name="close"></ion-icon>
            </div>
            <img src='/img/Hello-pana.png'></img>
            <div className='GAD-main-text'>
              <p>Hello, friend! I would like to tell you that you might have a <strong>SEVERE ANXIETY</strong></p>
              <p>Severe anxiety can feel overwhelming, affecting daily life and causing distress. However, seeking professional 
                help is a crucial step towards managing its impact with support and guidance. Remember, reaching out is a courageous 
                act that paves the way for finding relief and reclaiming peace of mind.
              </p>
            </div>
            <div className='GAD-links'>
              <div className='GAD-to-exerc'>
                <p>We recommend trying out these games/exercises of ours</p>
                <button>Exercises</button>
              </div>
              <div className='GAD-mid'></div>
              <div className='GAD-to-clinic'>
                <p>We highly recommend you to have a seat with us and talk for a while</p>
                <button>Book an appointment</button>
              </div>
            </div>
          </div>

        </div>
    );
}

export const quiz = {
    questions: [
      {
        question: 'What activities or tasks do you find most enjoyable in your free time?',
        choices: ['Solving problems or puzzles', 'Working on creative projects', 'Helping others or being part of a team']
      },
      {
        question: 'Which subjects interested you the most during your school years?',
        choices: ['Mathematics or Science', 'Art or Literature', 'Social Studies or Psychology'],
      },
      {
        question: 'In a work environment, what type of role do you think you would thrive in?',
        choices: ['Analyzing data or statistics', 'Designing or creating visual content', 'Collaborating with others or managing projects'],
      },
      {
        question: 'What motivates you the most in a job?',
        choices: ['Achieving measurable results', 'Expressing creativity and innovation', 'Building relationships and making a positive impact'],
      },
      {
        question: 'How do you handle challenges or problems at work?',
        choices: ['Analyzing the situation and finding logical solutions', 'Approaching problems with creativity and unique ideas', 'Seeking input from others and working as a team to find solutions'],
      },
      {
        question: 'What type of work environment do you prefer?',
        choices: ['Structured and organized', 'Dynamic and creative', 'Supportive and collaborative'],
      },
      {
        question: 'Which of the following best describes your communication style?',
        choices: ['Precise and factual', 'Expressive and imaginative', 'Empathetic and relationship-focused'],
      },
      {
        question: 'What are your long-term career goals?',
        choices: ['Advancing in a specialized field', 'Pursuing a creative or artistic career', 'Contributing to community or social causes'],
      },
      {
        question: 'How do you prefer to learn new skills or information?',
        choices: ['Through systematic and logical instruction', 'Through hands-on experiences and experimentation', 'Through group discussions and collaborative learning'],
      },
      {
        question: 'What do you value most in a job?',
        choices: ['Advancing in a specialized field', 'Pursuing a creative or artistic career', 'Contributing to community or social causes'],
      },
    ],
  }

  export const quiz2 = {
    questions2: [
      {
        question2: 'How do you prioritize tasks on your to-do list?',
        choices2: [
          'Based on deadlines and urgency',
          'Considering the importance and impact on long-term goals',
          'Collaboratively with others to determine shared priorities',
        ],
      },
      {
        question2: 'What time management tools do you find most effective?',
        choices2: [
          'Calendars and reminders for deadlines',
          'Goal-setting frameworks and planning tools',
          'Team collaboration and project management tools',
        ],
      },
      {
        question2: 'How do you handle interruptions or unexpected tasks during your workday?',
        choices2: [
          'Quickly address and get back on track',
          'Assess their impact on overall goals before responding',
          'Communicate and collaborate with others to manage interruptions',
        ],
      },
      {
        question2: 'What is your preferred method for breaking down larger projects?',
        choices2: [
          'Create a timeline with specific deadlines for each task',
          'Identify key milestones and set goals for achievement',
          'Collaborate with a team to distribute tasks and responsibilities',
        ],
      },
      {
        question2: 'How do you approach time-blocking or scheduling your day?',
        choices2: [
          'Allocating specific time slots for each task',
          'Prioritizing tasks and focusing on high-impact activities',
          'Coordinating schedules with team members for shared time blocks',
        ],
      },
      {
        question2: 'What strategies do you use to overcome procrastination?',
        choices2: [
          'Set strict deadlines and create a sense of urgency',
          'Break tasks into smaller, more manageable parts',
          'Seek accountability and support from others',
        ],
      },
      {
        question2: 'How do you handle a heavy workload or tight deadlines?',
        choices2: [
          'Prioritize tasks and work efficiently under pressure',
          'Strategically plan and allocate time to meet deadlines',
          'Collaborate with others to share the workload and meet collective goals',
        ],
      },
      {
        question2: 'How often do you review and reflect on your time management strategies?',
        choices2: [
          'Regularly assess and make adjustments as needed',
          'Periodically reflect on progress and adjust long-term goals',
          'Collaboratively review strategies with team members',
        ],
      },
      {
        question2: 'What role does flexibility play in your time management approach?',
        choices2: [
          'Limited flexibility; prefer sticking to planned schedules',
          'Willing to adjust plans when necessary for better outcomes',
          'Collaboratively adapt schedules based on team needs',
        ],
      },
      {
        question2: 'How do you communicate your time management expectations to others?',
        choices2: [
          'Clearly communicate deadlines and expectations',
          'Share overarching goals and encourage team collaboration',
          'Collaboratively set expectations and goals with team members',
        ],
      },
    ],
  };

  export const quiz3 = {
    questions3: [
      {
        question3: 'How do you prefer to learn new skills or acquire knowledge in your field?',
        choices3: [
          'Through structured online courses and tutorials ',
          'Exploring and experimenting on your own ',
          'Participating in workshops, seminars, or group training sessions ',
        ],
      },
      {
        question3: 'When faced with a challenging task or project, what is your approach to gaining the necessary expertise?',
        choices3: [
          'Researching and studying relevant materials independently ',
          'Engaging in hands-on experiences and trial-and-error ',
          'Seeking guidance and mentorship from experienced colleagues ',
        ],
      },
      {
        question3: 'How important is professional development to you in your current or future career?',
        choices3: [
          'Essential for staying current and advancing in your field ',
          'Important for personal growth and exploration ',
          'Valuable for building a network and connecting with industry professionals ',
        ],
      },
      {
        question3: 'What type of learning environment do you find most effective?',
        choices3: [
          'Quiet and focused individual learning settings ',
          'Dynamic and flexible learning environments ',
          'Collaborative and interactive group learning settings ',
        ],
      },
      {
        question3: 'How do you stay informed about industry trends and developments?',
        choices3: [
          'Reading industry publications and research articles ',
          'Exploring online forums and communities ',
          'Attending conferences and networking events ',
        ],
      },
      {
        question3: 'In a team project, how do you contribute your expertise to help others learn?',
        choices3: [
          'Sharing researched information and data ',
          'Demonstrating practical skills through examples ',
          'Facilitating discussions and knowledge-sharing sessions ',
        ],
      },
      {
        question3: 'What role does feedback play in your approach to continuous learning?',
        choices3: [
          'Valuing constructive criticism for improvement ',
          'Using feedback to iterate and refine your methods ',
          'Engaging in open dialogue to understand diverse perspectives ',
        ],
      },
      {
        question3: 'When presented with a new technology or tool in your field, how do you approach learning to use it?',
        choices3: [
          'Following structured tutorials and documentation ',
          'Experimenting with the tool to explore its features ',
          'Collaborating with others to collectively understand and implement it ',
        ],
      },
      {
        question3: 'What motivates you to pursue continuous professional development?',
        choices3: [
          'Advancing in your career and gaining recognition ',
          'Personal satisfaction and the joy of learning ',
          'Building connections and relationships within the industry ',
        ],
      },
      {
        question3: 'How do you approach acquiring new skills that are not directly related to your current job responsibilities?',
        choices3: [
          'Targeting skills aligned with your current role and career goals ',
          'Exploring diverse skills for personal enrichment ',
          'Considering skills that enhance collaboration and teamwork ',
        ],
      },
    ],
  };