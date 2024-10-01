import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureGrid = () => {
  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-yellow-100 h-72">
          <CardHeader>
            <CardTitle>Collaborate for Seamless Kitchen Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Use powerful tasks and scheduled reminders to create a great
              kitchen organization experience.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-blue-100 h-72">
          <CardHeader>
            <CardTitle>Smart Shopping Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Generate shopping lists based on your inventory and meal plans.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-purple-100 h-72">
          <CardHeader>
            <CardTitle>Inventory Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Keep track of all your kitchen items effortlessly.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 bg-green-100 h-72">
          <CardHeader>
            <CardTitle>Smart Shopping Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Generate shopping lists based on your inventory and meal plans.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeatureGrid;
