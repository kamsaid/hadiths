import Link from 'next/link';

/**
 * PrayerCampaign component to display current prayer campaigns
 * 
 * @param {string} title - Campaign title
 * @param {number} participants - Number of current participants
 * @param {string} timeLeft - Time remaining (e.g., "4 hours", "2 days")
 * @param {string} status - Campaign status ("upcoming", "ongoing", "ended")
 * @param {string} imageSrc - Path to the campaign image
 * @param {string} href - URL to the campaign page
 */
export function PrayerCampaign({ title, participants, timeLeft, status, imageSrc, href }) {
  // Generate status badge based on the status prop
  const getBadgeClass = () => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'ended':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };
  
  // Format participant count with commas
  const formattedParticipants = participants.toLocaleString();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Campaign Image */}
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
              <img 
                src={imageSrc} 
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getBadgeClass()}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            </div>
            
            {/* Campaign Info */}
            <div className="p-8 md:w-3/5 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {title}
                </h3>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Participants</p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                      {formattedParticipants}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                      {status === 'ended' ? 'Ended' : 'Time left'}
                    </p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                      {status === 'ended' ? 'Campaign over' : timeLeft}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Join thousands of Muslims worldwide in this special prayer challenge. 
                  Strengthen your connection with Allah during this blessed month.
                </p>
              </div>
              
              <Link 
                href={href}
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-md w-full md:w-auto"
              >
                {status === 'ended' ? 'View Results' : 'Join Campaign'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 