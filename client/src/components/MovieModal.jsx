export default function MovieModal({ form, setForm, onSubmit, onClose, isSubmitting, title = 'Add Movie' }) {
	const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-[#FAF9F5] w-full max-w-lg rounded-xl shadow-2xl p-6"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-[#480902]">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-[#480902] transition-colors text-2xl leading-none"
					>
						&times;
					</button>
				</div>

				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="relative">
							<input
								id="title"
								type="text"
								value={form.title}
								onChange={handleChange}
								className="block px-3 pb-2 pt-5 w-full text-sm bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-[#480902] peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="title"
								className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-left px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-3.5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#480902]"
							>
								Title
							</label>
						</div>

						<div className="relative">
							<input
								id="genre"
								type="text"
								value={form.genre}
								onChange={handleChange}
								className="block px-3 pb-2 pt-5 w-full text-sm bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-[#480902] peer"
								placeholder=" "
							/>
							<label
								htmlFor="genre"
								className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-left px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-3.5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#480902]"
							>
								Genre
							</label>
						</div>
					</div>

					<div className="relative">
						<select
							id="status"
							value={form.status}
							onChange={handleChange}
							className="block px-3 pb-2 pt-5 w-full text-sm bg-[#FAF9F5] border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-[#480902] peer"
						>
							<option value="" disabled />
							<option value="want to watch">Want to Watch</option>
							<option value="watched">Watched</option>
						</select>
						<label
							htmlFor="status"
							className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-left px-3 peer-focus:text-[#480902]"
						>
							Status
						</label>
					</div>

					<div className="relative">
						<textarea
							id="notes"
							rows={3}
							value={form.notes}
							onChange={handleChange}
							className="block px-3 pb-2 pt-5 w-full text-sm bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-[#480902] peer resize-none"
							placeholder=" "
						/>
						<label
							htmlFor="notes"
							className="absolute text-sm text-gray-500 duration-200 transform -translate-y-3 scale-75 top-4 z-10 origin-left px-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-3.5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#480902]"
						>
							Notes
						</label>
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="px-5 py-2 rounded-lg border border-[#480902] text-[#480902] text-sm font-medium hover:bg-[#480902]/10 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-5 py-2 rounded-lg bg-[#480902] text-white text-sm font-medium hover:bg-[#6b1003] transition-colors disabled:opacity-50"
						>
							{isSubmitting ? 'Saving...' : 'Save'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
