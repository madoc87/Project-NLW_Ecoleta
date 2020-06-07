//Buscar na Api do IBGE os estados existentes e preencher o option do formulario
function populateUFs(){
	const ufSelect = document.querySelector("select[name=uf]")

	fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
	.then( (res) => {return res.json() })
	.then( states => {

		for(const state of states) {
			ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
		}
	} )

}

populateUFs()

//De acordo com o estado selecionado alterar o link da api do IBGE para buscar as cidades do respectivo estado
function getCities(event){
	const citySelect = document.querySelector("select[name=city]")
	const stateInput = document.querySelector("input[name=state]")
	const ufValue = event.target.value

	const indexOfselectedState = event.target.selectedIndex
	stateInput.value = event.target.options[indexOfselectedState].text
	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

	citySelect.innerHTML = '<option value="">Seleciona o Cidade</option>'
	citySelect.disabled = true

	fetch(url)
	.then( res => res.json() )
	.then( cities => {
		
		for(const city of cities) {
			citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
		}

		citySelect.disabled = false;
	} )

}

//Ouvir as mudanças do formulario no campo de estados chamando a função para buscar as cidades
document.
	querySelector("select[name=uf]").
	addEventListener("change", getCities)

 

//Itens de coleta
 //Pegar todos os li's
 const itensToCollect = document.querySelectorAll(".items-grid li")

 for (const item of itensToCollect){
 	item.addEventListener("click", handleSelectedItem)
 }

const collectedItems = document.querySelector('input[name=items]')

 let selectedItems = []

function handleSelectedItem(event){
	const itemLi = event.target

	itemLi.classList.toggle("selected")

	const itemId = event.target.dataset.id

	//verificar se existes itens selecionados, se sim pegar os itens selecionados

	alreadyselected = selectedItems.findIndex( item => {
		const itemFound = item == itemId //isso será true ou false
		return itemFound
	})

	//se já estiver selecionado, tirar da selecao
	if(alreadyselected >= 0){
		//tirar selecao
		const filteredItems = selectedItems.filter( item => {
			const itemIsDifferent = item != itemId
			return itemIsDifferent
		})

		selectedItems = filteredItems
	}else{
	//se não estiver selecioonado, adicionar à seleção
		selectedItems.push(itemId)	
	}

	//autalizar o campo escondido com os itens selecionados
	collectedItems.value = selectedItems
}








// Forma completa de funcao anonima que retorna um valor
// .then( (res) => {return res.jason() })
// Forma completa de funcao anonima que retorna um valor
// .then( res => res.jason() )