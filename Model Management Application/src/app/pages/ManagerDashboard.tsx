import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { api, Job } from '../services/api';
import { Plus, Briefcase, Calendar, MapPin, Users } from 'lucide-react';

export default function ManagerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await api.getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
        <p className="text-gray-600">Administrer modeller, jobs og udgifter</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => navigate('/manager/create-model')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-200 hover:border-blue-300 flex flex-col items-center justify-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Plus className="w-8 h-8" />
          <span className="font-medium">Opret ny model</span>
        </button>

        <button
          onClick={() => navigate('/manager/create-manager')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-200 hover:border-blue-300 flex flex-col items-center justify-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Plus className="w-8 h-8" />
          <span className="font-medium">Opret ny manager</span>
        </button>

        <button
          onClick={() => navigate('/manager/create-job')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-200 hover:border-blue-300 flex flex-col items-center justify-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <Plus className="w-8 h-8" />
          <span className="font-medium">Opret nyt job</span>
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Alle Jobs</h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Indlæser jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Ingen jobs endnu</p>
            <button
              onClick={() => navigate('/manager/create-job')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Opret dit første job
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/manager/job/${job.id}`)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(job.date).toLocaleDateString('da-DK')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.customer}</span>
                  </div>

                  {job.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  )}

                  {job.models && job.models.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{job.models.length} model(ler)</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
