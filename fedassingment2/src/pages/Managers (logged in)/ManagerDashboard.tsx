import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Briefcase, Calendar, MapPin, Users } from 'lucide-react';
import { getMyJobs } from "../../services/Jobservice";

export default function ManagerDashboard() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function loadJobs() {
        try {
            const data = await getMyJobs();
            setJobs(data);
        } catch (error) {
            console.error('Failed to load jobs:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadJobs();
    }, []);

    return (
        <div className='dashboard-container'>
            <div className='Dashboardafsnit'>
                <h1>Manager Dashboard</h1>
                <p>Administrer modeller, jobs og udgifter</p>
            </div>
            <div className="dashboard-grid">
                <button className="dashboard-card" onClick={() => navigate('/manager/create-model')}>
                    <Plus className="icon" />
                    <span className="label">Opret ny model</span>
                </button>

                <button className="dashboard-card" onClick={() => navigate('/manager/create-manager')}>
                    <Plus className="icon" />
                    <span className="label">Opret ny manager</span>
                </button>

                <button className="dashboard-card" onClick={() => navigate('/manager/create-job')}>
                    <Plus className="icon" />
                    <span className="label">Opret nyt job</span>
                </button>
            </div>
            <div>
                <h2 className="job-section">Alle Jobs</h2>

                {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p>Indlæser jobs...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="empty-state">
                        <Briefcase className="icon-large" />
                        <p>Ingen jobs endnu</p>
                        <button className='createJobButton' onClick={() => navigate('/manager/create-job')}>
                            Opret dit første job
                        </button>
                    </div>
                ) : (
                    <div className="job-grid">
                        {jobs.map((job) => (
                            <div key={job.jobId} className="job-card" onClick={() => navigate(`/manager/job/${job.jobId}`)}>
                                <h3>{job.customer}</h3>
                                <p className="description">{job.comments}</p>

                                <div className="job-details">
                                    <div className="detail-item">
                                        <Calendar size={16} />
                                        <span>{new Date(job.startDate).toLocaleDateString('da-DK')}</span>
                                    </div>
                                    <div className="detail-item">
                                        <Calendar size={16} />
                                        <span>Varighed: {job.days} dage</span>
                                    </div>

                                    {/* Lokation */}
                                    <div className="detail-item">
                                        <MapPin size={16} />
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                            </div>
                ))}
            </div>
                )}
        </div>
        </div >
    )
};

