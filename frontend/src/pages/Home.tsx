import { Link } from "react-router-dom"

function Home() {
    return (
    <div className="home-page">
        <h1 style={{ margin:'15px 0'}}>Welcome!</h1>
        <h3>For using task management you can go <Link to='/tasks'>here</Link>!</h3>
    </div>
    )
}

export default Home