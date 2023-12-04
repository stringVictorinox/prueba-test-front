"use client";

import { useState } from 'react';
import ModalCreate from './modalCreate';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { MdCatchingPokemon } from "react-icons/md";

function Header({createPokemon, error}) {

	const [itsActive, setItsActive] = useState<boolean>(false);

	const redirectToExternalLink = (url: string) => {
		window.open(url, '_blank');
	}

	return (
		<header className="p-3 bg-slate-200 shadow-lg">
			<div className="flex justify-between h-10 mx-auto">

				<button onClick={() => setItsActive(true)} type="button" className="text-gray-900 bg-slate-200 gap-x-1 border border-gray-400 shadow-md shadow-black/30
				hover:shadow-inner hover:shadow-black/30 duration-300 rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center ">
					<MdCatchingPokemon className='w-6 h-6' />Crear Pokémon</button>

				<div className="flex flex-row space-x-4 text-xl justify-center items-center">
					<AiFillGithub
						onClick={() => redirectToExternalLink('https://github.com/stringVictorinox')}
						className='bg-slate-200 box-content px-3 py-2 rounded-lg shadow-sm shadow-black/30 cursor-pointer hover:shadow-inner
								   hover:shadow-black/30 duration-300 hover:text-gray-900' />

					<AiFillLinkedin
						onClick={() => redirectToExternalLink('https://www.linkedin.com/in/victor-pestana/')}
						className='bg-slate-200 box-content px-3 py-2 rounded-lg shadow-sm shadow-black/30 cursor-pointer hover:shadow-inner
								   hover:shadow-black/30 duration-300 hover:text-blue-500' />
				</div>

			</div>

			<ModalCreate itsActive={itsActive} setItsActive={setItsActive} createPokemon={createPokemon} error={error} />
		</header>
	)
}

export default Header;