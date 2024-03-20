import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateFilterType } from '../types/types';

const schema = yup.object().shape({
	startDate: yup.date(),
	endDate: yup.date().when('startDate', (startDate, schema) => {
		return startDate ? schema.min(startDate, 'Start date cannot be greater than End date') : schema;
	}),
});

const FilterModal = ({
	onDateRangeChange,
	loading,
	isModal,
	setModal,
}: {
	onDateRangeChange: (startDate?: null | Date, endDate?: null | Date) => void;
	loading: boolean;
	isModal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: DateFilterType) => {
		onDateRangeChange(data.startDate, data.endDate);
	};

	return (
		<dialog id="filter-modal" className={`modal ${isModal ? 'modal-open' : ''}`}>
			<div className="modal-box">
				<form method="dialog">
					<button className="btn btn-sm btn-ghost absolute right-2 top-2" onClick={() => setModal(false)}>
						✕
					</button>
				</form>
				<h3 className="font-bold text-lg">Filter By</h3>
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mt-3">
							<label className="font-medium">Date of Birth</label>
							<div className="flex gap-4 mt-2">
								<div>
									<span className="mx-2 text-sm font-medium">From:</span>
									<input
										type="date"
										{...register('startDate')}
										className={`grow input input-bordered ${errors.startDate ? 'border-red-500' : ''}`}
									/>
								</div>

								<div>
									<span className="mx-2 text-sm font-medium">To:</span>
									<input
										type="date"
										{...register('endDate')}
										className={`grow input input-bordered ${errors.endDate ? 'border-red-500' : ''}`}
									/>
									
								</div>
							</div>
							{errors.endDate && <p className="text-red-500 text-sm mt-1 pl-2">{errors.endDate.message}</p>}

							<div className="modal-action">
								{loading && <span className="loading loading-spinner loading-md"></span>}
								<button
									onClick={() => {
										reset();
										onSubmit({});
									}}
									disabled={loading}
									className="btn btn-primary btn-outline"
								>
									Clear
								</button>
								<button type="submit" disabled={loading} className="btn btn-primary">
									Apply
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	);
};

export default FilterModal;
