import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { api, Expense, Job } from '../services/api';
import { ArrowLeft, DollarSign } from 'lucide-react';

export default function JobExpenses() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [jobId]);

  const loadData = async () => {
    if (!jobId) return;

    try {
      const [jobData, expensesData] = await Promise.all([
        api.getJob(jobId),
        api.getJobExpenses(jobId),
      ]);

      setJob(jobData);
      setExpenses(expensesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return <div className="text-center py-12 text-gray-600">Job ikke fundet</div>;
  }

  return (
    <div className="max-w-4xl">
      <button
        onClick={() => navigate(`/manager/job/${jobId}`)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Tilbage til job
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Udgifter for {job.title}</h1>
        <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
          <DollarSign className="w-6 h-6" />
          {totalExpenses.toFixed(2)} kr
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Alle udgifter</h2>

        {expenses.length > 0 ? (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(expense.date).toLocaleDateString('da-DK')}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">{expense.amount.toFixed(2)} kr</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p>Ingen udgifter registreret endnu</p>
          </div>
        )}
      </div>
    </div>
  );
}
