import { MdEdit, MdDelete } from 'react-icons/md';

export default function EditDelete({ onEdit, onDelete, isDeleting }) {
	return (
		<div className="flex gap-2">
			<button
				onClick={(e) => { e.stopPropagation(); e.preventDefault(); onEdit(); }}
				className="p-1.5 rounded-md text-[#480902] hover:bg-[#480902]/10 transition-colors"
				title="Edit"
			>
				<MdEdit size={18} />
			</button>
			<button
				onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(); }}
				disabled={isDeleting}
				className="p-1.5 rounded-md text-[#B64B0F] hover:bg-red-50 transition-colors disabled:opacity-50"
				title="Delete"
			>
				<MdDelete size={18} />
			</button>
		</div>
	);
}
