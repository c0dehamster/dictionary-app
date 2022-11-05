const input = document.querySelector(".search-area__input")
const searchButton = document.querySelector(".search-area__button")
const outputSection = document.querySelector(".output")

async function displayData() {
	const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
	const wordTitle = document.querySelector(".word__title")
	const word = input.value

	try {
		const response = await fetch(`${url}${word}`)
		const data = await response.json()
		console.log(data)

		wordTitle.textContent = word

		document.querySelector(".details__part-of-speech").textContent = data[0].meanings[0].partOfSpeech
		document.querySelector(".details__transcription").textContent = data[0].phonetic
		document.querySelector(".output__meaning").textContent = data[0].meanings[0].definitions[0].definition
		document.querySelector(".output__example").textContent = data[0].meanings[0].definitions[0].example || ""
	} catch (error) {
		wordTitle.textContent = "Could not find the word"
		console.log(error)
	}

	outputSection.classList.remove("output--hidden")
}

searchButton.addEventListener("click", displayData)
input.addEventListener("keydown", e => {
	if (e.key === "Enter") {
		e.preventDefault()
		displayData()
	}
})
