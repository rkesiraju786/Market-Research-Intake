import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  FileText, 
  MapPin, 
  Plus, 
  Trash2, 
  UserRound, 
  X 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { apiRequest } from "@/lib/queryClient";

// Define the schema for a role
const roleSchema = z.object({
  title: z.string().min(2, { message: "Role title is required" }),
  description: z.string().optional(),
  jobUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  jobDescription: z.string().optional(),
});

// Define the schema for a location
const locationSchema = z.object({
  country: z.string().min(2, { message: "Country is required" }),
  region: z.string().min(2, { message: "Region/State is required" }),
  city: z.string().optional(),
});

// Define the main form schema
const formSchema = z.object({
  roles: z.array(roleSchema).min(1, { message: "At least one role is required" }),
  locations: z.array(locationSchema).min(1, { message: "At least one location is required" }),
  additionalNotes: z.string().optional(),
});

// Types
export type Role = z.infer<typeof roleSchema>;
export type Location = z.infer<typeof locationSchema>;

// Available roles for the dropdown
const availableRoles = [
  "Software Engineer", 
  "Data Scientist", 
  "Product Manager", 
  "UX Designer", 
  "DevOps Engineer",
  "Marketing Manager",
  "Financial Analyst",
  "Business Analyst",
  "Sales Representative",
  "Human Resources Specialist",
  "Customer Service Representative",
  "Project Manager",
  "Graphic Designer",
  "Content Writer",
  "Operations Manager"
];

// Available countries for the dropdown
const availableCountries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Japan",
  "Singapore",
  "Brazil"
];

// Available regions by country
const regionsByCountry: Record<string, string[]> = {
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", 
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", 
    "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  "Canada": [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", 
    "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", 
    "Quebec", "Saskatchewan", "Yukon"
  ],
  "United Kingdom": [
    "England", "Northern Ireland", "Scotland", "Wales"
  ],
  "Australia": [
    "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland", 
    "South Australia", "Tasmania", "Victoria", "Western Australia"
  ],
  "Germany": [
    "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", 
    "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", 
    "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
  ],
  "France": [
    "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", 
    "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", 
    "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
  ],
  "India": [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ],
  "Japan": [
    "Hokkaido", "Tohoku", "Kanto", "Chubu", "Kansai", "Chugoku", "Shikoku", "Kyushu"
  ],
  "Singapore": ["Central Region", "East Region", "North Region", "North-East Region", "West Region"],
  "Brazil": [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", 
    "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", 
    "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", 
    "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ]
};

interface StrategicSourcingDetailsFormProps {
  onBack: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  variant: string;
}

enum FormStep {
  EDIT = 0,
  CONFIRMATION = 1
}

export default function StrategicSourcingDetailsForm({ 
  onBack, 
  onSubmit,
  variant
}: StrategicSourcingDetailsFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.EDIT);
  const [showExtraCreditsWarning, setShowExtraCreditsWarning] = useState(false);
  const [lastActionData, setLastActionData] = useState<{ type: 'role' | 'location', action: () => void } | null>(null);
  const { toast } = useToast();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number | null>(null);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: [{ title: "", description: "", jobUrl: "", jobDescription: "" }],
      locations: [{ country: "United States", region: "New York", city: "" }],
      additionalNotes: "",
    },
  });

  // Get roles and locations from form
  const roles = form.watch("roles");
  const locations = form.watch("locations");

  // Handle role operations
  const addRole = () => {
    const currentRoles = form.getValues("roles");
    
    // If we have 5 or more roles, show warning for additional credits
    if (currentRoles.length >= 5) {
      // Store the action in case user confirms
      setLastActionData({
        type: 'role',
        action: () => {
          const updatedRoles = [
            ...currentRoles,
            { title: "", description: "", jobUrl: "", jobDescription: "" }
          ];
          form.setValue("roles", updatedRoles);
          
          // Add corresponding location if needed
          const currentLocations = form.getValues("locations");
          if (currentRoles.length > currentLocations.length) {
            const updatedLocations = [
              ...currentLocations,
              { country: "", region: "", city: "" }
            ];
            form.setValue("locations", updatedLocations);
          }
        }
      });
      
      // Show warning
      setShowExtraCreditsWarning(true);
      return;
    }
    
    // If not at max, add directly
    const updatedRoles = [
      ...currentRoles,
      { title: "", description: "", jobUrl: "", jobDescription: "" }
    ];
    form.setValue("roles", updatedRoles);
    
    // Add corresponding location if needed
    const currentLocations = form.getValues("locations");
    if (updatedRoles.length > currentLocations.length) {
      const updatedLocations = [
        ...currentLocations,
        { country: "", region: "", city: "" }
      ];
      form.setValue("locations", updatedLocations);
    }
  };

  const removeRole = (index: number) => {
    const currentRoles = form.getValues("roles");
    if (currentRoles.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "At least one role is required.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedRoles = currentRoles.filter((_, i) => i !== index);
    form.setValue("roles", updatedRoles);
  };

  // Handle location operations
  const addLocation = () => {
    const currentLocations = form.getValues("locations");
    
    // Check if we're at max capacity
    if (currentLocations.length >= 5) {
      // Store the action in case user confirms
      setLastActionData({
        type: 'location',
        action: () => {
          const updatedLocations = [
            ...currentLocations,
            { country: "", region: "", city: "" }
          ];
          form.setValue("locations", updatedLocations);
        }
      });
      
      // Show warning
      setShowExtraCreditsWarning(true);
      return;
    }
    
    // If not at max, add directly
    const updatedLocations = [
      ...currentLocations,
      { country: "", region: "", city: "" }
    ];
    form.setValue("locations", updatedLocations);
  };

  const removeLocation = (index: number) => {
    const currentLocations = form.getValues("locations");
    if (currentLocations.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "At least one location is required.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedLocations = currentLocations.filter((_, i) => i !== index);
    form.setValue("locations", updatedLocations);
  };

  // Validate the form before submitting
  const validateForm = (): boolean => {
    // Validate roles and locations
    const roleFields = form.getValues("roles");
    const locationFields = form.getValues("locations");
    let isValid = true;
    
    // Validate roles
    for (let i = 0; i < roleFields.length; i++) {
      if (!roleFields[i].title) {
        form.setError(`roles.${i}.title` as any, {
          type: "manual",
          message: "Role title is required"
        });
        isValid = false;
      }
    }
    
    // Validate locations
    for (let i = 0; i < locationFields.length; i++) {
      if (!locationFields[i].country) {
        form.setError(`locations.${i}.country` as any, {
          type: "manual",
          message: "Country is required"
        });
        isValid = false;
      }
      if (!locationFields[i].region) {
        form.setError(`locations.${i}.region` as any, {
          type: "manual",
          message: "Region is required"
        });
        isValid = false;
      }
    }
    
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
    
    return isValid;
  };

  const handleConfirmExtraCredits = () => {
    // Execute the stored action
    if (lastActionData) {
      lastActionData.action();
    }
    
    // Reset state
    setShowExtraCreditsWarning(false);
    setLastActionData(null);
    
    // Show confirmation toast
    toast({
      title: "Additional Item Added",
      description: `Added extra ${lastActionData?.type}. Additional credits will be charged.`,
    });
  };

  const cancelExtraCredits = () => {
    setShowExtraCreditsWarning(false);
    setLastActionData(null);
  };

  const handleSubmitForm = async (data: z.infer<typeof formSchema>) => {
    // Call the parent component's onSubmit, but don't navigate away after submission
    await onSubmit(data);
    
    // Move to confirmation step within this component
    setCurrentStep(FormStep.CONFIRMATION);
    
    // No redirect - stay on this screen
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="inline-flex items-center text-[#8186B4] hover:text-[#4600FF] hover:bg-[#CCCFFF]/20 mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        
        <h2 className="text-2xl font-bold gradient-heading mb-2">
          {variant === "basic" ? "Strategic Sourcing" : "Strategic Sourcing Plus"}
        </h2>
        
        <div className="flex items-center space-x-2 mt-4">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white text-sm
            ${currentStep >= FormStep.EDIT ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}>
            {currentStep > FormStep.EDIT ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div className={`h-1 w-12 ${currentStep > FormStep.EDIT ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}></div>
          
          <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white text-sm
            ${currentStep >= FormStep.CONFIRMATION ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}>
            {currentStep > FormStep.CONFIRMATION ? <Check className="h-4 w-4" /> : "2"}
          </div>
        </div>
        
        <p className="text-[#8186B4] mt-2">
          {currentStep === FormStep.EDIT && "Step 1: Define Role-Location Pairs"}
          {currentStep === FormStep.CONFIRMATION && "Step 2: Request Submitted"}
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-8">
          {/* Edit Step - Combined Role-Location Pairs and Review */}
          {currentStep === FormStep.EDIT && (
            <AnimatedContainer animation="fadeIn" className="space-y-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">
                    <span className="text-[#4600FF] mr-2">✨</span>
                    Define your role-location pairs
                  </h3>
                  <p className="text-sm text-[#8186B4] mt-1">
                    For each role, specify the location where you want to source talent. Each pair will be analyzed together.
                  </p>
                </div>
              </div>
              
              {/* Role-Location Pairs */}
              <div>
                {roles.map((role, index) => (
                  <Card key={index} className="mb-6 border border-[#CCCFFF] shadow-sm">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-[#4600FF] text-white mr-2">
                          {index + 1}
                        </Badge>
                        <CardTitle className="text-lg text-[#130056]">Role-Location Pair</CardTitle>
                      </div>
                      {roles.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-[#FF4219] hover:text-[#FF4219] hover:bg-red-50"
                          onClick={() => removeRole(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4 pt-3">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Role Information */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center mb-1">
                            <UserRound className="h-4 w-4 mr-1 text-[#4600FF]" />
                            <FormLabel className="text-[#130056] mb-0">Role Details</FormLabel>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name={`roles.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#130056] text-sm">Job Title <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="border-[#CCCFFF] bg-white">
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {availableRoles.map((roleName) => (
                                        <SelectItem key={roleName} value={roleName}>
                                          {roleName}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex flex-col items-center justify-center bg-gray-50 border border-[#CCCFFF] rounded-md p-4 mt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="text-[#4600FF] border-dashed border-[#CCCFFF] bg-white"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Add Job Description
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">Upload a file or add a URL</p>
                          </div>
                        </div>
                        
                        {/* Location Information */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center mb-1">
                            <MapPin className="h-4 w-4 mr-1 text-[#4600FF]" />
                            <FormLabel className="text-[#130056] mb-0">Location Details</FormLabel>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name={`locations.${index}.country`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#130056] text-sm">Country <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      form.setValue(`locations.${index}.region`, "");
                                    }}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="border-[#CCCFFF] bg-white">
                                      <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {availableCountries.map((country) => (
                                        <SelectItem key={country} value={country}>
                                          {country}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`locations.${index}.region`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#130056] text-sm">State/Region <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                    disabled={!form.getValues(`locations.${index}.country`)}
                                  >
                                    <SelectTrigger className="border-[#CCCFFF] bg-white">
                                      <SelectValue placeholder="Select state/region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {form.getValues(`locations.${index}.country`) &&
                                        regionsByCountry[form.getValues(`locations.${index}.country`)]?.map((region) => (
                                          <SelectItem key={region} value={region}>
                                            {region}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`locations.${index}.city`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#130056] text-sm">City/MSA (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter city or metropolitan area"
                                    className="border-[#CCCFFF]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Add Role-Location Button */}
              <div className="flex flex-col space-y-3">
                <Button 
                  type="button"
                  variant="outline" 
                  className="text-[#4600FF] border-[#4600FF] border-dashed"
                  onClick={addRole}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Role-Location Pair
                </Button>
                
                {roles.length >= 5 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">⚠️</span>
                      <div>
                        <p className="text-amber-800 text-sm">
                          You've added {roles.length} role-location pairs. Adding more than 5 pairs will incur additional credits and may extend the delivery timeline.
                        </p>
                        <p className="text-amber-700 text-xs mt-1">
                          Each additional pair costs 10 credits and may add 1-3 days to delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Review Summary Section */}
              <div className="mt-8 pt-8 border-t border-[#CCCFFF]">
                <h3 className="text-xl font-semibold text-[#130056] mb-4">Review and Submit</h3>
                
                <div className="p-6 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF] mb-6">
                  <div className="flex items-center mb-4">
                    <UserRound className="h-5 w-5 mr-2 text-[#4600FF]" />
                    <h4 className="font-medium text-[#130056]">Request Summary</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#8186B4]">Report Type:</span>
                      <span className="font-medium text-[#130056]">Strategic Sourcing {variant === "plus" ? "Plus" : ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8186B4]">Role-Location Pairs:</span>
                      <span className="font-medium text-[#130056]">{roles.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8186B4]">Expected Delivery:</span>
                      <span className="font-medium text-[#130056]">
                        2 weeks {roles.length > 3 ? "+ 1-3 days" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8186B4]">Credits:</span>
                      <span className="font-medium text-[#130056]">
                        {variant === "plus" ? "75" : "50"} 
                        {roles.length > 3 ? ` + ${(roles.length - 3) * 10} additional` : ""}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Additional Notes */}
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#130056]">Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information or requirements..."
                          rows={3}
                          className="border-[#CCCFFF]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end mt-6">
                <Button 
                  type="button"
                  variant="outline"
                  className="border-[#4600FF] text-[#4600FF] rounded-full px-8 mr-4"
                  onClick={onBack}
                >
                  Cancel
                </Button>
                
                <Button 
                  type="submit"
                  className="bg-[#4600FF] hover:bg-[#130056] rounded-full px-8"
                  onClick={() => {
                    if (!validateForm()) {
                      return;
                    }
                  }}
                >
                  Submit Request
                </Button>
              </div>
            </AnimatedContainer>
          )}

          {/* Confirmation Step */}
          {currentStep === FormStep.CONFIRMATION && (
            <AnimatedContainer animation="fadeIn" className="py-8 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="md:w-7/12 text-left mb-8 md:mb-0 md:pr-10">
                <h2 className="text-3xl font-bold text-[#130056] mb-2">
                  Request Submitted!
                </h2>
                <h3 className="text-2xl font-bold text-[#130056] mb-6">
                  Your Report is Being Processed
                </h3>
                
                <div className="text-[#8186B4] mb-8">
                  <p className="mb-4">
                    Thank you for submitting your report request. Our team is now reviewing your request 
                    and will begin processing it shortly.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-[#130056] mb-3">What happens next?</h4>
                  
                  <ul className="space-y-2">
                    <li>Your request is in the queue for analysis</li>
                    <li>Once processing is complete, you'll receive a notification</li>
                    <li>Reports are typically available within {roles.length > 3 ? "15" : "14"} business days</li>
                  </ul>
                  
                  <div className="flex items-center mt-6">
                    <div className="text-[#4600FF] mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 8V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8"></path>
                        <path d="M10 12v3"></path>
                        <path d="M14 12v3"></path>
                        <path d="M3 4h18"></path>
                        <path d="M8 4v4a2 2 0 0 1-2 2"></path>
                        <path d="M16 4v4a2 2 0 0 0 2 2"></path>
                      </svg>
                    </div>
                    <p className="text-[#130056] font-medium">
                      You will receive an email once your report is ready!
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <Link href="/dashboard">
                      <Button 
                        type="button"
                        className="bg-[#4600FF] hover:bg-[#130056] rounded-full px-8"
                      >
                        View My Requests
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="md:w-5/12 relative">
                <div className="relative">
                  {/* Circular progress indicator */}
                  <div className="w-72 h-72 rounded-full bg-[#E9ECFF] mx-auto relative">
                    {/* Blue arc overlay */}
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#4600FF" 
                        strokeWidth="4" 
                        strokeDasharray="283" 
                        strokeDashoffset="70" 
                        className="transform -rotate-90 origin-center" 
                      />
                    </svg>
                    
                    {/* Document icon with checkmark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <svg width="100" height="130" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 0C1.34315 0 0 1.34315 0 3V27C0 28.6569 1.34315 30 3 30H21C22.6569 30 24 28.6569 24 27V8L16 0H3Z" fill="#4600FF"/>
                          <path d="M6 13H18M6 17H18M6 21H14" stroke="white" strokeWidth="1.5"/>
                          <path d="M16 0V5C16 6.65685 17.3431 8 19 8H24L16 0Z" fill="#5414FF"/>
                        </svg>
                        
                        {/* Checkmark badge */}
                        <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#16082F] flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          )}
        </form>
      </Form>

      {/* Extra Credits Warning Dialog */}
      <AlertDialog open={showExtraCreditsWarning} onOpenChange={setShowExtraCreditsWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Additional Credits Required</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <div className="mb-2">
                  You're adding additional {lastActionData?.type}-location pairs beyond the standard package.
                </div>
                
                <div className="py-3 px-4 rounded-md bg-[#F8F9FE] border border-[#CCCFFF] mb-3">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-[#4600FF]">
                      <span className="inline-flex h-6 w-6 rounded-full bg-[#4600FF] items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    </div>
                    <div className="text-sm font-medium text-[#130056]">
                      Standard package includes:
                    </div>
                  </div>
                  <ul className="mt-1 text-sm text-[#8186B4] list-disc list-inside pl-4">
                    <li>Up to 5 role-location pairs</li>
                    <li>Standard 2-week delivery</li>
                    <li>{variant === "plus" ? "75" : "50"} credits total</li>
                  </ul>
                </div>
                
                <div className="py-3 px-4 rounded-md bg-[#FFF9E5] border border-[#FFE082]">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-[#FF9800]">⚠️</div>
                    <div className="text-sm font-medium text-[#130056]">
                      Each additional pair requires:
                    </div>
                  </div>
                  <ul className="mt-1 text-sm text-[#8186B4] list-disc list-inside pl-4">
                    <li>10 additional credits</li>
                    <li>May extend delivery by 1-3 days</li>
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelExtraCredits}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmExtraCredits}
              className="bg-[#4600FF] hover:bg-[#130056] text-white"
            >
              Add Additional Pair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}