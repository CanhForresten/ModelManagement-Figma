import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { api, Job, Model } from '../services/api';
import { ArrowLeft, Plus, X, Calendar, MapPin, Briefcase, DollarSign, Loader2 } from 'lucide-react';

export default function ManageJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModel, setShowAddModel] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadData();
  }, [jobId]);

  const loadData = async () => {
    if (!jobId) return;

    try {
      const [jobData, modelsData] = await Promise.all([
        api.getJob(jobId),
        api.getAllModels(),
      ]);

      setJob(jobData);
      setAllModels(modelsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddModel = async () => {
    if (!jobId || !selectedModelId) return;

    setIsAdding(true);
    try {
      await api.addModelToJob(jobId, selectedModelId);
      await loadData();
      setShowAddModel(false);
      setSelectedModelId('');
    } catch (error) {
      console.error('Failed to add model:', error);
      alert('Kunne ikke tilføje model.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveModel = async (modelId: string) => {
    if (!jobId) return;

    if (!confirm('Er du sikker på at du vil fjerne denne model fra jobbet?')) {
      return;
    }

    try {
      await api.removeModelFromJob(jobId, modelId);
      await loadData();
    } catch (error) {
      console.error('Failed to remove model:', error);
      alert('Kunne ikke fjerne model.');
    }
  };

  const availableModels = allModels.filter(
    (model) => !job?.models?.some((m) => m.id === model.id)
  );

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
        onClick={() => navigate('/manager/dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Tilbage til dashboard
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
        <p className="text-gray-600 mb-6">{job.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4" />
            <span>{new Date(job.date).toLocaleDateString('da-DK')}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Briefcase className="w-4 h-4" />
            <span>{job.customer}</span>
          </div>

          {job.location && (
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(`/manager/job/${jobId}/expenses`)}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <DollarSign className="w-4 h-4" />
          Se udgifter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Modeller på dette job</h2>
          <button
            onClick={() => setShowAddModel(!showAddModel)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tilføj model
          </button>
        </div>

        {showAddModel && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-4">
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Vælg en model</option>
                {availableModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.firstName} {model.lastName} ({model.email})
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddModel}
                disabled={!selectedModelId || isAdding}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Tilføj'}
              </button>
            </div>
          </div>
        )}

        {job.models && job.models.length > 0 ? (
          <div className="space-y-3">
            {job.models.map((model) => (
              <div
                key={model.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {model.firstName} {model.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{model.email}</p>
                  {model.height && (
                    <p className="text-xs text-gray-500 mt-1">Højde: {model.height} cm</p>
                  )}
                </div>

                <button
                  onClick={() => handleRemoveModel(model.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Fjern model"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <p>Ingen modeller på dette job endnu</p>
          </div>
        )}
      </div>
    </div>
  );
}
