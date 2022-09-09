const footer = document.querySelector('footer')
const url = {
    linkedIn: 'https://www.linkedin.com/in/zaminfantado/'
}

footer.innerHTML = `
    <div class="py-1">
        <div class="text-center">
            Created by <a href="${ url.linkedIn }" target="_blank" class="text-bold">Zam</a> © ${ (new Date()).getFullYear() }
        </div>
    </div>
    
`

