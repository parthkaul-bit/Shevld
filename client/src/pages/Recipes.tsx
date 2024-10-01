import React, { useState } from "react";
import { Search, ChefHat, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Recipe {
  name: string;
  description: string;
  cookTime: number;
  servings: number;
  image: string;
}

const RecipeCard: React.FC<Recipe> = ({
  name,
  description,
  cookTime,
  servings,
  image,
}) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center">
        <Avatar className="h-10 w-10 mr-2">
          <AvatarImage src={image || "/api/placeholder/40/40"} alt={name} />
          <AvatarFallback>
            <ChefHat />
          </AvatarFallback>
        </Avatar>
        {name}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="flex items-center space-x-4">
        <Badge variant="secondary">
          <Clock className="mr-1 h-3 w-3" /> {cookTime} mins
        </Badge>
        <Badge variant="secondary">
          <Users className="mr-1 h-3 w-3" /> {servings} servings
        </Badge>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        View Recipe
      </Button>
    </CardFooter>
  </Card>
);

const Recipes: React.FC = () => {
  const [recipes] = useState<Recipe[]>([
    {
      name: "Spaghetti Carbonara",
      description:
        "A classic Italian pasta dish with eggs, cheese, and pancetta.",
      cookTime: 30,
      servings: 4,
      image: "/api/placeholder/40/40",
    },
    {
      name: "Chicken Stir-Fry",
      description:
        "A quick and easy Asian-inspired dish with vegetables and chicken.",
      cookTime: 25,
      servings: 3,
      image: "/api/placeholder/40/40",
    },
    {
      name: "Vegetable Curry",
      description:
        "A flavorful and hearty vegetarian curry with mixed vegetables.",
      cookTime: 45,
      servings: 4,
      image: "/api/placeholder/40/40",
    },
    {
      name: "Grilled Salmon",
      description: "Delicious grilled salmon with lemon and herbs.",
      cookTime: 20,
      servings: 2,
      image: "/api/placeholder/40/40",
    },
    {
      name: "Mushroom Risotto",
      description: "Creamy Italian rice dish with assorted mushrooms.",
      cookTime: 40,
      servings: 4,
      image: "/api/placeholder/40/40",
    },
  ]);

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search recipes..." className="pl-8" />
      </div>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} {...recipe} />
      ))}
    </div>
  );
};

export default Recipes;
