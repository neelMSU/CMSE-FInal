import './App.css';
import * as tf from '@tensorflow/tfjs'
import {useState,useEffect} from 'react'

function App() {

  const [isModelLoading,setIsModelLoading]=useState(false)
  const [model,setModel]=useState(null)

  const loadModel=async () => {
    setIsModelLoading(true)
    try {
      const model=await tf.loadLayersModel('https://raw.githubusercontent.com/Techdevweb/HeartApp/main/models/model.json')
      setModel(model)
      setIsModelLoading(false)
    } catch (error) {
      console.log(error)
      setIsModelLoading(false)
    }
  }

  useEffect(()=>{
    loadModel()
  },[])

  function Predict() {
    var a1, a2, a3, a4, a5

      a1 = Number(document.getElementById('1').value)
      a2 = Number(document.getElementById('2').value)
      a3 = Number(document.getElementById('3').value)
      a4 = Number(document.getElementById('4').value)
      a5 = Number(document.getElementById('5').value)

      var input = tf.tensor2d([
        [a1, a2, a3, a4, a5]
      ])


      var output = model.predict(input)
      console.log(output);
      var opData=output.dataSync()
      var d0=opData[0]
      var d1=opData[1]
      var d2=opData[2]

      var ans=null

      if (d0>d1) {
        if (d0>d2) {
          ans='Fine'
        }
        else{
          ans='Serious'
        }
      }
      else{
        if (d1>d2) {
          ans='Need to be taken care of'
        }
        else{
          ans='serious'
        }
      }

      console.log(opData);
      console.log(ans);
      document.getElementById('ans').innerHTML = ans

  }

  return (
    <div className="App" style={{ 
      backgroundImage: `url(${"https://media.istockphoto.com/id/1288913695/photo/the-development-of-a-human-embryo-inside-the-womb-during-pregnancy-little-baby-3d-illustration.jpg?s=170667a&w=0&k=20&c=sNGAfT6rxTxvkOztz6zAFfLnhJws-06ZPlFSvblmIyk="})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
      }} >
      <header className="App-header">
      <input id='1' placeholder='Beats of Baby'></input>
      <input id='2' placeholder='Fetal Movement'></input>
      <input id='3' placeholder="Fetal Heart Rate"></input>
      <input id='4' placeholder='ASTV'></input>
      <input id='5' placeholder='ALTV'></input>

      <div class='btnn'>
    <button onClick={Predict} cssClass='e-primary'>Make prediction</button>
    </div>
    <center><h1 id='ans'>Predictions</h1></center>

      
      </header>
    </div>
  );
}

export default App;
