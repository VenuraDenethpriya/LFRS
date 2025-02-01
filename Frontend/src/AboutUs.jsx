function AboutUs() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 p-12 bg-blue-950 text-white">
            <div className="">
                <h1 className="text-3xl font-bold text-center pt-8">About Us</h1>
                <p className="p-8 text-justify">
                Using our Lost and Found Reporting System is simple, secure, and efficient. If you’ve lost an item, start by 
                submitting a detailed report through our online platform, including descriptions, last known location, and any relevant 
                details that can help in identification. Once submitted, our team will carefully review your report and begin the verification 
                process. You will receive real-time updates as the investigation progresses, keeping you informed at every stage. Law enforcement 
                officials will work diligently to match lost items with reports and update their status accordingly. Our system is designed to 
                improve efficiency, reduce paperwork, and enhance transparency, ensuring that every report is handled with care. By bridging 
                the gap between the public and law enforcement, we aim to make the recovery process faster, more reliable, and easily 
                accessible for everyone.
                </p>
            </div>
            <div className="p-12">
                <iframe className="h-auto w-full sm:h-96 shadow-lg shadow-slate-200" src="https://www.youtube.com/embed/LWqmXkoCI2M"></iframe>
            </div>
        </section>
    );
}

export default AboutUs;