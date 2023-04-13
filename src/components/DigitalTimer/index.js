// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerRunningOrNot: false,
    timeLimitInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.timerId)

  resetTime = () => {
    this.clearTimeInterval()
    this.setState({
      timerRunningOrNot: false,
      timeLimitInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  incrementTimeInSeconds = () => {
    const {timeLimitInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeLimitInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({timerRunningOrNot: false})
    } else {
      this.setState(prevState => ({
        timeLimitInSeconds: prevState.timeLimitInSeconds + 1,
      }))
    }
  }

  startOrPauseTimer = () => {
    const {
      timerRunningOrNot,
      timeLimitInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeLimitInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeLimitInSeconds: 0})
    }
    if (timerRunningOrNot) {
      this.clearTimeInterval()
    } else {
      this.timerId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({
      timerRunningOrNot: !prevState.timerRunningOrNot,
    }))
  }

  timerControls = () => {
    const {timerRunningOrNot} = this.state

    const startOrPauseUrl = timerRunningOrNot
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseText = timerRunningOrNot ? 'pause icon' : 'play icon'

    return (
      <div className="start-pause-container">
        <button
          onClick={this.startOrPauseTimer}
          type="button"
          className="startPause-button"
        >
          <img alt={startOrPauseText} className="image" src={startOrPauseUrl} />
          <p className="start-pause-text">
            {timerRunningOrNot ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          onClick={this.resetTime}
          type="button"
          className="startPause-button"
        >
          <img
            alt="reset icon"
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="start-pause-text">Reset</p>
        </button>
      </div>
    )
  }

  onDecrement = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  timeLimitController = () => {
    const {timerLimitInMinutes, timeLimitInSeconds} = this.state
    const isButtonsDisabled = timeLimitInSeconds > 0

    return (
      <div className="time-controller-container">
        <p className="set-timer-text">Set Timer Limit</p>
        <div className="time-controller">
          <button
            disabled={isButtonsDisabled}
            onClick={this.onDecrement}
            className="limit-controllers"
            type="button"
          >
            -
          </button>
          <p className="time-value">{timerLimitInMinutes}</p>
          <button
            disabled={isButtonsDisabled}
            onClick={this.onIncrement}
            className="limit-controllers"
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getActualTime = () => {
    const {timeLimitInSeconds, timerLimitInMinutes} = this.state

    const remainingSeconds = timerLimitInMinutes * 60 - timeLimitInSeconds

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerRunningOrNot} = this.state
    const lableText = timerRunningOrNot ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="image-timer-container">
          <div className="image-container">
            <div className="timer-container">
              <h1 className="timer-text">{this.getActualTime()}</h1>
              <p className="status-text">{lableText}</p>
            </div>
          </div>

          <div className="bottom-container">
            {this.timerControls()}
            {this.timeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
