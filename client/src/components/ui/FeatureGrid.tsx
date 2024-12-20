import { Users, CalendarCheck, ClipboardList } from "lucide-react";

const FeatureSteps = () => {
  return (
    <section className="bg-gradient-to-b from-white to-yellow-100 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight text-gray-900">
            Features
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Discover how easy shared living can be when you and your flatmates
            cook, organize, and thrive as one.
          </p>
        </div>

        {/* Feature Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {/* Feature 1 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Collaborative Kitchen
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              View groceries added by all flatmates along with photos and
              expiration dates. Track what’s expiring or running out and keep
              your kitchen organized together.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
                <ClipboardList className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Grocery List
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Collaboratively create and manage a shared grocery list for your
              flat. Easily track items to purchase, and automatically add bought
              items to the kitchen page.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors duration-300">
                <CalendarCheck className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Recipe Suggestions
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get recipe suggestions when groceries are close to expiration. Use
              our database to make the most of your ingredients and reduce food
              waste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSteps;
