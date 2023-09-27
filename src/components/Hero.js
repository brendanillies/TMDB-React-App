const Hero = ({ text, backdropURL }) => {
    return (
        <header className='bg-dark text-white p-5 hero-container'>
            <h1 className='hero-text'>{ text }</h1>
            {
                backdropURL &&
                    <div className="hero-backdrop" style={{'backgroundImage': `url(${backdropURL})`}}></div>
            }
        </header>
    )
};

export default Hero;