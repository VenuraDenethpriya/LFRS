export const getLostReports = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/lostitem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        throw new Error("Failed to get lost reports")
    }

}

export const getFoundReports = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/founditem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json()
        console.log(data)
        return data;
    } catch (error) {
        throw new Error("Failed to get found reports")
    }
}