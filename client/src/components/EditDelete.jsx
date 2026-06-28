import { MdEdit, MdDelete } from 'react-icons/md';

export default function EditDelete({ onEdit, onDelete, isDeleting }) {
	return (
		<div className="flex flex-wrap gap-2">
			<button
				onClick={(e) => {
					e.stopPropagation();
					navigation;
					e.preventDefault();
					onEdit();
				}}
				className="p-1.5 rounded-md text-[#480902] hover:bg-[#480902]/10 transition-colors cursor-pointer"
				title="Edit"
			>
				<MdEdit size={18} />
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					onDelete();
				}}
				disabled={isDeleting}
				className="p-1.5 rounded-md text-[#B64B0F] hover:bg-[#480902]/10 transition-colors disabled:opacity-50 cursor-pointer"
				title="Delete"
			>
				<MdDelete size={18} />
			</button>
		</div>
	);
}
