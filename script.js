const input = document.querySelector(".search-area__input")
const searchButton = document.querySelector(".search-area__button")
const outputSection = document.querySelector(".output")
const otherMeaningsButton = document.querySelector(".output__other-meanings")

async function displayData() {
	const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
	const wordTitle = document.querySelector(".word__title")
	const word = input.value
	let counter = 0

	try {
		const response = await fetch(`${url}${word}`)
		const data = await response.json()
		console.log(data)

		function assignValues(index) {
			document.querySelector(".details__part-of-speech").textContent = data[0].meanings[index].partOfSpeech
			document.querySelector(".output__meaning").textContent = data[0].meanings[index].definitions[0].definition
			document.querySelector(".output__example").textContent =
				data[0].meanings[index].definitions[0].example || ""
		}

		wordTitle.textContent = word

		document.querySelector(".details__transcription").textContent = data[0].phonetic
		assignValues(0)

		otherMeaningsButton.addEventListener("click", () => {
			counter = counter === data[0].meanings.length - 1 ? 0 : counter + 1
			assignValues(counter)
		})
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
