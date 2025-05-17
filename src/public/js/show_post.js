/*
 * En el editor agregar efectos de temblor en texto o saltos cosas
 * así, que se vea vivo el texto
 * 
 * aparece primera palabra del titulo, desaparece, aparece la siguiente,
 * desaparece, ...
 * nunca quede un p solo, minimo dos o tres
 * icono cambiar pagina derecha se mueve dos veces rapidito pausa, al
 * rato repite, que se vea tierno
 * 
 * agregar indice si hay subtitulos para más comodidad
 * si tiene indice luego cuantos subtitulos tiene ??
 * indice icono menu amburguesa en medio de flechas cambiar página
 * agregar fuente con negrita italica
 * solo usar negritas, no italica ni subrrallado
 * al pasar de página se quita el titulo quizás aparece al final
 * con el juego o si no hay juego aparece el titulo, si hay juego,
 * aparece solo el juego
 * 
 * despues del titulo puede volver al inicio del articulo como
 * videos en tictok que vuelven al inicio (quizas)
 */



const Appear_Txt = new class AppearTxt {
	constructor() {
		window.addEventListener('load', () => {
			window.scrollTo({top: -1000, behavior: 'smooth'})

			this.article = document.querySelector('.publication article')
			const txt = this.article.children
			this.txt = this.group(txt)
			this.page = 0
			this.len = this.txt.length - 1
			this.turningPage = false

			if (this.len > 0) {
				this.showOnlyFirstPage()
				btn_next_page.style.display = "inline"
				window.addEventListener('keyup', e => {
					if (e.key == 'ArrowLeft')
						this.changePage(false)
					else if (e.key == 'ArrowRight')
						this.changePage()
				})
				btn_previous_page.onclick = e => {this.changePage(false)}
				btn_next_page.onclick = e => {this.changePage()}
			}

			this.img_btn_previous_page = btn_previous_page.children[0]
			this.img_btn_next_page = btn_next_page.children[0]
			this.disablePreviousPageBtn()

			window.addEventListener('keyup', this.arrowScrollHandler)

			setTimeout(async () => {
				const buttons = document.getElementsByClassName('buttons')[0]
				buttons.classList.add('appear-buttons')
			}, 1000)
		})
	}



	group(txt) {
		const grouped_txt = []
		let i_page = -1
		for (let tag of txt) {
			if (tag instanceof HTMLHeadingElement) {
				grouped_txt.push([])
				i_page += 1
			}
			grouped_txt[i_page].push(tag)
		}
		return grouped_txt
		/*
		const grouped_txt = [[
			txt[0],
			txt[1]
		]]
		if (!txt[2]) return grouped_txt
		grouped_txt[0][2] = txt[2]

		for (let i = 3; i < txt.length; i += 2)
			grouped_txt.push([
				txt[i],
				txt[i+1]
			])

		const last_group = grouped_txt[grouped_txt.length - 1]
		if (!last_group[1])
			last_group.pop()
		return grouped_txt
		*/
	}



	async changePage(next = true) {
		if (next && this.page == this.len) return
		else if (!next && this.page == 0) return

		if (this.turningPage) return
		this.turningPage = true

		const page = this.page
		this.page += next ? 1 : -1

		if (window.scrollY) {
			window.scrollTo({top: -1000, behavior: 'smooth'})
			await this.sleep(250)
		}

		await this.hidePage(page)
		const txt = this.txt[this.page]

		if (this.len == 0) return this.turningPage = false

		this.activateBtnsChangePages()
		if (this.page == 0)
			this.disablePreviousPageBtn()
		else if (this.page == this.len)
			this.disableNextPageBtn()

		for (let t of txt) {
			t.style.animation = 'disappear .6s ease-out forwards reverse' // .4s
			t.style.display = 'block'
		}

		Adjust_Gradient_Height.adjustGradientHeight()
		Particle_Position_Handler.adjustParticleBinsSize()

		await this.sleep(480) // 590
		for (let t of txt) t.style.animation = ''

		this.turningPage = false
	}

	activateBtnsChangePages() {
		btn_previous_page.style.filter = ''
		btn_previous_page.style.cursor = ''
		this.img_btn_previous_page.style.opacity = ''

		btn_next_page.style.filter = ''
		btn_next_page.style.cursor = ''
		this.img_btn_next_page.style.opacity = ''
	}

	disablePreviousPageBtn() {
		btn_previous_page.style.filter = 'contrast(.6)'
		btn_previous_page.style.cursor = 'revert'
		this.img_btn_previous_page.style.opacity = '.8'
	}

	disableNextPageBtn() {
		btn_next_page.style.filter = 'contrast(.6)'
		btn_next_page.style.cursor = 'revert'
		this.img_btn_next_page.style.opacity = '.8'
	}



	arrowScrollHandler = e => {
		const key = e.key
		if (key != 'ArrowLeft' && key != 'ArrowRight') return

		clearTimeout(this.arrowScrollHandlerTimer)
		this.arrowScrollHandlerTimer = setTimeout(() => {
			if (window.scrollY)
				window.scrollTo({top: -1000, behavior: 'smooth'})
		}, 600)
	}



	async hidePage(page) {
		const txt = this.txt[page]

		for (let t of txt)
			t.style.animation = 'disappear .2s ease-out forwards'

		await this.sleep(190)

		for (let t of txt) {
			t.style.animation = ''
			t.style.display = 'none'
		}
	}

	sleep(time) {
		return new Promise(res => {
			setTimeout(res, time)
		})
	}



	showOnlyFirstPage() {
		const len = this.txt.length
		for (let i_page = 1; i_page < len; i_page++)
			for (let p of this.txt[i_page])
				p.style.display = 'none'
	}
}




/*
 * We could make an external function that has these values or
 * use erencia but ..., it gives me peresa :)
 * 
 * jaja this if it is professional documentation ;D
 */




const Adjust_Gradient_Height = new class AdjustGradientHeight {
	constructor() {
		this.publication = document.getElementsByClassName('publication')[0]
		this.gradient_a = document.getElementsByClassName('background_gradient_a')[0]
		this.gradient_b = document.getElementsByClassName('background_gradient_b')[0]
		this.adjustGradientHeight()
	}

	adjustGradientHeight = () => {
		this.gradient_a.style.height = `${this.gradient_b.offsetHeight}px`
		this.scroll_limit = this.publication.offsetHeight - 381
	}
}




window.addEventListener('load', () => {
	Adjust_Gradient_Height.adjustGradientHeight()
	window.addEventListener('resize', () => {
		Adjust_Gradient_Height.adjustGradientHeight()
		// scrollGradient()
	})

	let translateY
	const scrollGradient = () => {
		translateY = window.pageYOffset > Adjust_Gradient_Height.scroll_limit
			? Adjust_Gradient_Height.scroll_limit
			: window.pageYOffset
		Adjust_Gradient_Height.gradient_a.style.transform = `translateY(-${translateY}px)`
	}

	window.addEventListener('scroll', scrollGradient)

	Particle_Position_Handler = new ParticlePositionHandler
	const Particle_Handler = new Particles()
})




let Particle_Position_Handler
class ParticlePositionHandler {
	constructor() {
		this.publication = document.getElementsByClassName('publication')[0]
		this.particlesLeft = document.getElementsByClassName('left_particles')[0]
		this.particlesRight = document.getElementsByClassName('right_particles')[0]
		this.article = document.querySelectorAll('.publication article')[0]

		this.adjustParticleBinsSize()
		window.addEventListener('resize', this.adjustParticleBinsSize)
	}



	adjustParticleBinsSize = () => {
		this.computeSizesParticleBins()
		this.setSizesParticleBins()
	}



	computeSizesParticleBins() {
		const publicationWidth = this.publication.clientWidth
		const articleWidth = this.article.clientWidth

		const publicationHeight = this.publication.clientHeight
		const windowHeight = window.innerHeight
		const height = publicationHeight > windowHeight
			? windowHeight
			: publicationHeight

		this.sizes = {
			width: (publicationWidth - articleWidth) / 2 + 'px',
			height: height + 'px'
		}
	}



	setSizesParticleBins() {
		this.particlesLeft.style.width = this.sizes.width
		this.particlesLeft.style.height = this.sizes.height
		this.particlesLeft.style.marginRight = '-' + this.sizes.width

		this.particlesRight.style.width = this.sizes.width
		this.particlesRight.style.height = this.sizes.height
		this.particlesRight.style.marginLeft = '-' + this.sizes.width
	}
}




/* --- --- --- Párticulas --- --- --- */

class Particles {
	constructor(
		amountParticles = 3,
		min_size = 13,
		max_size = 25,
		interval = 7
	) {
		this.min = min_size - 1
		this.range = max_size - min_size + 1
		
		this.animations = ['left100', 'left30', 'right30', 'right100']
		this.animation = `${interval}s ease-out`
		this.timer = interval * 1000 + 500
		this.sleepCreateParticle = interval * 214

		this.leftParticles = document.getElementsByClassName('left_particles')[0]
		this.rightParticles = document.getElementsByClassName('right_particles')[0]
		this.downParticles = document.getElementsByClassName('down_particles')[0]
		this.particles = []
		this.intervals = []
		this.createParticles(amountParticles)

		this.rightParticlesChildren = this.rightParticles.children
		this.document = document.documentElement
		this.lastDocumentWidth = this.document.clientWidth
		window.addEventListener('resize', this.hideOverflowParticles)

		document.onvisibilitychange = this.disableParticles
	}



	createParticles(amountParticles) {
		for (let i = 0; i < amountParticles; i++) {
			this.createParticle(this.leftParticles)
			this.createParticle(this.rightParticles)
			this.createParticle(this.downParticles)
		}

		this.setAnimationAllParticles()
	}



	sleep(time) {
		return new Promise(res => {
			setTimeout(res, time)
		})
	}



	createParticle(particleContainer) {
		const particle = document.createElement('div')
		particle.className = 'particle'
		particle.style.animation = this.animation
		particleContainer.appendChild(particle)

		const animation = particleContainer.className == 'right_particles'
			? this.changeAnimationRight
			: this.changeAnimation

		this.particles.push({particle, animation})
	}



	setAnimationAllParticles = async () => {
		let i = 0
		for (let particle of this.particles) {
			if (document.hidden) break
			this.setAnimation(particle.particle, particle.animation)
			i++
			if (i % 3 == 0)
				await this.sleep(this.sleepCreateParticle)
		}
	}

	setAnimation = (particle, animation) => {
		animation(particle)
		const interval = setInterval(async () => {
			particle.style.animationName = ''
			await this.sleep(100)
			animation(particle)
		}, this.timer)

		this.intervals.push(interval)
	}



	changeAnimation = particle => {
		const size = this.min + Math.ceil(Math.random() * this.range)
		particle.style.width = particle.style.height = size + 'em'

		particle.style.top = 30 + Math.ceil(Math.random() * 65) + '%'

		const left = 10 + Math.ceil(Math.random() * 80)
		particle.style.left = `calc(${left}% - ${Math.ceil(size/2)}px)`

		const i_animation = this.rightParticles.clientWidth > 80
			? Math.ceil(Math.random() * 4) - 1
			: 2
		particle.style.animationName = this.animations[i_animation]
	}



	changeAnimationRight = particle => {
		const size = this.min + Math.ceil(Math.random() * this.range)
		particle.style.width = particle.style.height = size + 'em'

		particle.style.top = 30 + Math.ceil(Math.random() * 65) + '%'

		const width = this.rightParticles.clientWidth
		let left = 10 + Math.ceil(Math.random() * 80)
		left = width * (left/100) - size
		particle.style.left = left + 'px'

		let i_animation
		if (left < width - 120)
			i_animation = Math.ceil(Math.random() * 4) - 1
		else if (left < width - 50)
			i_animation = Math.ceil(Math.random() * 3) - 1
		else i_animation = 1

		particle.style.animationName = this.animations[i_animation]
	}



	hideOverflowParticles = () => {
		if (this.documentBigger()) return

		const width = this.rightParticles.clientWidth - 30
		let left, animation, animationName

		for (let particle of this.rightParticlesChildren) {
			animationName = particle.style.animationName
			animation = parseInt(/\d+/.exec(animationName))
			animation *= animationName.substr(0, 1) == 'r' ? 1 : -1

			left = parseInt(particle.style.left)
			if (left > width)
				particle.style.left = width - 30 + 'px'

			left = parseInt(particle.style.left)
			if (left + animation > width)
				particle.style.animationName = 'left30'
		}
	}

	documentBigger = () => {
		const increase = this.document.clientWidth >= this.lastDocumentWidth
			? true
			: false
		this.lastDocumentWidth = this.document.clientWidth
		return increase
	}



	disableParticles = () => {
		let particle
		const len = this.particles.length

		if (document.hidden) {
			for (let i = 0; i < len; i++) {
				clearInterval(this.intervals[i])
				particle = this.particles[i].particle
				particle.style.animationName = ''
			}
			this.intervals = []
		} else
			this.setAnimationAllParticles()
	}
}