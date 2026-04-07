<?php
    class Person { //This is a class NOT a function
        private $name;
        private $age;

        public function __construct($name, $age) { // Constructor method to initialize the properties
            $this->name = $name;
            $this->age = $age;
        }

        public function __destruct() { // Destructor method to clean up resources
            // Code to clean up resources can be added here if needed
        }

        public function getName() { // Method to get the name of the person
            return $this->name;
        }

        public function getAge() { // Method to get the age of the person
            return $this->age;
        }
    }

    // Example usage:
    $person1 = new Person("Alice", 30);
    echo "Name: " . $person1->getName() . "\n";
    echo "Age: " . $person1->getAge() . "\n";
    unset($person1); // This will trigger the destructor
    echo "Name: " . $person1->getName() . "\n"; // This will cause an error because $person1 has been unset
?>