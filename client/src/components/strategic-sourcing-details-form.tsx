import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  ROLES = 0,
  LOCATIONS = 1,
  REVIEW = 2,
  CONFIRMATION = 3
}

export default function StrategicSourcingDetailsForm({ 
  onBack, 
  onSubmit,
  variant
}: StrategicSourcingDetailsFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.ROLES);
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
    
    // Check if we're at max capacity
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

  // Navigation between steps
  const goToNextStep = () => {
    if (currentStep === FormStep.ROLES) {
      // Validate roles before proceeding
      const roleFields = form.getValues("roles");
      let isValid = true;
      
      for (let i = 0; i < roleFields.length; i++) {
        if (!roleFields[i].title) {
          form.setError(`roles.${i}.title` as any, {
            type: "manual",
            message: "Role title is required"
          });
          isValid = false;
        }
      }
      
      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required role fields.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(FormStep.LOCATIONS);
    } else if (currentStep === FormStep.LOCATIONS) {
      // Validate locations before proceeding
      const locationFields = form.getValues("locations");
      let isValid = true;
      
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
          description: "Please fill in all required location fields.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(FormStep.REVIEW);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === FormStep.LOCATIONS) {
      setCurrentStep(FormStep.ROLES);
    } else if (currentStep === FormStep.REVIEW) {
      setCurrentStep(FormStep.LOCATIONS);
    }
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

  const handleSubmitForm = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
    setCurrentStep(FormStep.CONFIRMATION);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header with current step indicator */}
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
            ${currentStep >= FormStep.ROLES ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}>
            {currentStep > FormStep.ROLES ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div className={`h-1 w-12 ${currentStep > FormStep.ROLES ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}></div>
          
          <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white text-sm
            ${currentStep >= FormStep.LOCATIONS ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}>
            {currentStep > FormStep.LOCATIONS ? <Check className="h-4 w-4" /> : "2"}
          </div>
          <div className={`h-1 w-12 ${currentStep > FormStep.LOCATIONS ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}></div>
          
          <div className={`rounded-full w-8 h-8 flex items-center justify-center text-white text-sm
            ${currentStep >= FormStep.REVIEW ? 'bg-[#4600FF]' : 'bg-[#CCCFFF]'}`}>
            {currentStep > FormStep.REVIEW ? <Check className="h-4 w-4" /> : "3"}
          </div>
        </div>
        
        <p className="text-[#8186B4] mt-2">
          {currentStep === FormStep.ROLES && "Step 1: Define Roles"}
          {currentStep === FormStep.LOCATIONS && "Step 2: Select Locations"}
          {currentStep === FormStep.REVIEW && "Step 3: Review Information"}
          {currentStep === FormStep.CONFIRMATION && "Request Submitted"}
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-8">
          {/* Roles Step */}
          {currentStep === FormStep.ROLES && (
            <AnimatedContainer animation="fadeIn" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">
                    <span className="text-[#4600FF] mr-2">✨</span>
                    Let's fill your report with the role details!
                  </h3>
                  <p className="text-sm text-[#8186B4] mt-1">
                    Add details about the roles and locations for your sourcing insights. You can only add up to 5 Roles and Locations.
                  </p>
                </div>
              </div>
              
              <div className="border border-[#CCCFFF] rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#F8F9FE]">
                      <th className="text-left p-4 text-sm font-medium text-[#130056] border-b border-[#CCCFFF] w-[30%]">Role</th>
                      <th className="text-left p-4 text-sm font-medium text-[#130056] border-b border-[#CCCFFF] w-[30%]">Location</th>
                      <th className="text-left p-4 text-sm font-medium text-[#130056] border-b border-[#CCCFFF] w-[35%]">Job Description</th>
                      <th className="text-left p-4 text-sm font-medium text-[#130056] border-b border-[#CCCFFF] w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <tr key={index} className="border-b border-[#CCCFFF] last:border-b-0">
                        <td className="p-4 align-top">
                          <FormField
                            control={form.control}
                            name={`roles.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
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
                        </td>
                        <td className="p-4 align-top">
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <FormField
                                control={form.control}
                                name={`locations.${index}.country`}
                                render={({ field }) => (
                                  <FormItem className="mb-1">
                                    <div className="flex items-center gap-1">
                                      <FormControl>
                                        <Select
                                          onValueChange={(value) => {
                                            field.onChange(value);
                                            form.setValue(`locations.${index}.region`, "");
                                          }}
                                          value={field.value}
                                        >
                                          <SelectTrigger className="border-[#CCCFFF] bg-white h-9 text-sm rounded-md px-2">
                                            <SelectValue placeholder="Country" />
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
                                      <span className="text-xs text-gray-500">Country</span>
                                      {field.value && (
                                        <X 
                                          className="h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
                                          onClick={() => form.setValue(`locations.${index}.country`, "")}
                                        />
                                      )}
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="relative">
                              <FormField
                                control={form.control}
                                name={`locations.${index}.region`}
                                render={({ field }) => (
                                  <FormItem className="mb-1">
                                    <div className="flex items-center gap-1">
                                      <FormControl>
                                        <Select 
                                          onValueChange={field.onChange} 
                                          value={field.value}
                                          disabled={!form.getValues(`locations.${index}.country`)}
                                        >
                                          <SelectTrigger className="border-[#CCCFFF] bg-white h-9 text-sm rounded-md px-2">
                                            <SelectValue placeholder="State/Region" />
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
                                      <span className="text-xs text-gray-500">State</span>
                                      {field.value && (
                                        <X 
                                          className="h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
                                          onClick={() => form.setValue(`locations.${index}.region`, "")}
                                        />
                                      )}
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            {index < locations.length - 1 ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-[#4600FF] border-dashed border-[#CCCFFF] bg-white h-7 w-7 p-0 rounded-full self-center"
                              >
                                +{locations.length - index - 1}
                              </Button>
                            ) : locations.length < 5 ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-[#4600FF] border-dashed border-[#CCCFFF] bg-white mt-1 self-start"
                                onClick={addLocation}
                              >
                                <Plus className="h-3.5 w-3.5 mr-1" />
                                Add Location
                              </Button>
                            ) : (
                              <p className="text-amber-600 text-xs flex items-center mt-1">
                                <span className="bg-amber-100 p-1 rounded-full mr-1">⚠️</span>
                                You've reached the limit of 5 locations.
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4 align-top">
                          <div className="flex flex-col items-center justify-center bg-gray-50 border border-[#CCCFFF] rounded-md p-4 h-24">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="text-[#4600FF] border-dashed border-[#CCCFFF] bg-white"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Add File or Add Link
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">Supports PDF, DOC, DOCX files</p>
                          </div>
                        </td>
                        <td className="p-4 text-center align-top">
                          {roles.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-gray-600 rounded-full p-1 h-auto"
                              onClick={() => removeRole(index)}
                            >
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {roles.length < 5 ? (
                <Button 
                  type="button"
                  variant="outline" 
                  className="text-[#4600FF] border-[#4600FF] mt-2"
                  onClick={addRole}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start mt-2">
                  <span className="text-amber-600 mr-2">⚠️</span>
                  <p className="text-amber-800 text-sm">
                    You've reached the limit of 5 Roles and 5 Locations.
                  </p>
                </div>
              )}
              
              <div className="flex justify-end mt-6">
                <Button 
                  type="button"
                  className="bg-[#4600FF] hover:bg-[#130056] rounded-full px-8"
                  onClick={goToNextStep}
                >
                  Continue
                </Button>
              </div>
            </AnimatedContainer>
          )}

          {/* Locations Step */}
          {currentStep === FormStep.LOCATIONS && (
            <AnimatedContainer animation="fadeIn" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#130056]">Select Locations</h3>
                <Button 
                  type="button"
                  variant="outline" 
                  className="ml-auto text-[#4600FF] border-[#4600FF]"
                  onClick={addLocation}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </div>
              
              <div className="space-y-8">
                {locations.map((location, index) => (
                  <Card key={index} className="border border-[#CCCFFF]">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-[#130056]">Location {index + 1}</CardTitle>
                        <CardDescription>Define the geographic location</CardDescription>
                      </div>
                      {locations.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-[#FF4219] hover:text-[#FF4219] hover:bg-red-50"
                          onClick={() => removeLocation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`locations.${index}.country`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#130056]">Country *</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                // Reset region when country changes
                                form.setValue(`locations.${index}.region`, "");
                              }} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#CCCFFF]">
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availableCountries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`locations.${index}.region`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#130056]">State/Region *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={!form.getValues(`locations.${index}.country`)}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#CCCFFF]">
                                  <SelectValue placeholder="Select a state/region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {form.getValues(`locations.${index}.country`) &&
                                  regionsByCountry[form.getValues(`locations.${index}.country`)]?.map((region) => (
                                    <SelectItem key={region} value={region}>
                                      {region}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`locations.${index}.city`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#130056]">City/MSA (Optional)</FormLabel>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  type="button"
                  variant="outline"
                  className="border-[#4600FF] text-[#4600FF] rounded-full px-8"
                  onClick={goToPreviousStep}
                >
                  Back
                </Button>
                
                <Button 
                  type="button"
                  className="bg-[#4600FF] hover:bg-[#130056] rounded-full px-8"
                  onClick={goToNextStep}
                >
                  Continue
                </Button>
              </div>
            </AnimatedContainer>
          )}

          {/* Review Step */}
          {currentStep === FormStep.REVIEW && (
            <AnimatedContainer animation="fadeIn" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#130056]">Review Your Information</h3>
                <p className="text-[#8186B4]">Please review all details before submitting.</p>
              </div>
              
              <div className="space-y-8">
                {/* Roles Review */}
                <Card className="border border-[#CCCFFF]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <UserRound className="h-5 w-5 mr-2 text-[#4600FF]" />
                      <CardTitle className="text-lg text-[#130056]">Roles</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roles.map((role, index) => (
                        <div key={index} className="p-4 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF]">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-[#130056]">{role.title || "Untitled Role"}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-[#4600FF] p-1 h-auto"
                              onClick={() => {
                                setCurrentStep(FormStep.ROLES);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                          {role.description && (
                            <p className="mt-1 text-sm text-[#8186B4]">{role.description}</p>
                          )}
                          {(role.jobUrl || role.jobDescription) && (
                            <div className="mt-2 text-xs text-[#8186B4]">
                              {role.jobUrl && <p>Job URL: {role.jobUrl}</p>}
                              {role.jobDescription && (
                                <p className="truncate">Job Description: {role.jobDescription.substring(0, 50)}...</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Locations Review */}
                <Card className="border border-[#CCCFFF]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-[#4600FF]" />
                      <CardTitle className="text-lg text-[#130056]">Locations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {locations.map((location, index) => (
                        <div key={index} className="p-4 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF]">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-[#130056]">
                              {location.country && location.region ? 
                                `${location.city ? location.city + ', ' : ''}${location.region}, ${location.country}` : 
                                "Incomplete Location"}
                            </h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-[#4600FF] p-1 h-auto"
                              onClick={() => {
                                setCurrentStep(FormStep.LOCATIONS);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                


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
              
              <div className="flex justify-between mt-6">
                <Button 
                  type="button"
                  variant="outline"
                  className="border-[#4600FF] text-[#4600FF] rounded-full px-8"
                  onClick={goToPreviousStep}
                >
                  Back
                </Button>
                
                <Button 
                  type="submit"
                  className="bg-[#4600FF] hover:bg-[#130056] rounded-full px-8"
                >
                  Submit
                </Button>
              </div>
            </AnimatedContainer>
          )}

          {/* Confirmation Step */}
          {currentStep === FormStep.CONFIRMATION && (
            <AnimatedContainer animation="fadeIn" className="text-center py-8">
              <div className="rounded-full bg-[#E9ECFF] w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-[#4600FF]" />
              </div>
              
              <h3 className="text-2xl font-bold text-[#130056] mb-3">
                Request Submitted Successfully
              </h3>
              
              <p className="text-[#8186B4] mb-6 max-w-xl mx-auto">
                Your Strategic Sourcing {variant === "plus" ? "Plus" : ""} request has been submitted. 
                You will receive a confirmation email shortly with details and next steps.
              </p>
              
              <div className="p-6 bg-[#F8F9FE] rounded-lg border border-[#CCCFFF] max-w-md mx-auto mb-8">
                <div className="flex justify-between mb-4">
                  <span className="text-[#8186B4]">Request Type:</span>
                  <span className="font-medium text-[#130056]">Strategic Sourcing {variant === "plus" ? "Plus" : ""}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-[#8186B4]">Roles:</span>
                  <span className="font-medium text-[#130056]">{roles.length}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-[#8186B4]">Locations:</span>
                  <span className="font-medium text-[#130056]">{locations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8186B4]">Expected Delivery:</span>
                  <span className="font-medium text-[#130056]">2 weeks</span>
                </div>
              </div>
              
              <Button 
                type="button"
                className="bg-[#4600FF] hover:bg-[#130056] rounded-full px-8"
                onClick={onBack}
              >
                Return to Dashboard
              </Button>
            </AnimatedContainer>
          )}
        </form>
      </Form>

      {/* Extra Credits Warning Dialog */}
      <AlertDialog open={showExtraCreditsWarning} onOpenChange={setShowExtraCreditsWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Additional Credits Required</AlertDialogTitle>
            <AlertDialogDescription>
              You've reached the maximum number of {lastActionData?.type}s (5). 
              Adding more will incur additional credits and may extend the delivery timeline.
              
              <div className="mt-4 py-3 px-4 rounded-md bg-[#FFF9E5] border border-[#FFE082]">
                <div className="flex">
                  <div className="mr-3 text-[#FF9800]">⚠️</div>
                  <div>
                    <p className="text-sm font-medium text-[#130056]">
                      Each additional {lastActionData?.type} adds:
                    </p>
                    <ul className="mt-1 text-sm text-[#8186B4] list-disc list-inside">
                      <li>10 additional credits</li>
                      <li>May extend delivery by 1-3 days</li>
                    </ul>
                  </div>
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
              Add Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}