import { Route, Routes } from 'react-router-dom';
import { Home, About, Pricing, NotFound } from './pages';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App;