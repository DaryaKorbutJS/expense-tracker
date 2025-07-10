import { Logo } from './components/Logo/index'
import { Loader } from './components/Loader/index'
import { Button } from './components/Button/index'
import { InputLabel } from './components/InputLabel/index'
import { Input } from './components/Input/index'
import { Icon } from './components/Icon/index'
import './App.css'

function handleClick() {
  alert('Button clicked!');
}

function App() {
  const name = "";

  return (
    <>
      <Logo />
      <Loader />

      <Icon iconName="bank" size={32} color="red" />
      <Icon iconName="bell" ariaLabel="Bell Icon" />
      <Icon iconName="transport" ariaLabel="Transport Icon" color="blue"/>

      <Button buttonType="primary" size="large" onClick={handleClick}>
        Sign in
      </Button>

      <Button buttonType="primary" size="large" disabled>
        Sign Out
      </Button>

      <Button buttonType="ghost" size="large">
        Button
      </Button>

      <Button buttonType="ghost" size="large" disabled>
        Button
      </Button>

      <Button buttonType="primary" size="small" shape="round">
        <span aria-hidden>-</span>
      </Button>

      <Button buttonType="ghost" size="small" shape="round">
        <span aria-hidden>-</span>
      </Button>

      <InputLabel htmlFor="username" required>
        Username
      </InputLabel>

      <InputLabel htmlFor="username">
        Email
      </InputLabel>

      <Input />
      <Input helperText="Error message" />
      <Input
        type="text"
        placeholder="Enter name"
        defaultValue={name}
        error
        helperText="Error message"
      />
    </>
  )
}

export default App
