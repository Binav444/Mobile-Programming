import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  SectionList,
  Switch,
  Modal,
  Alert,
  Keyboard,
  Animated,
} from 'react-native';

type CheckBoxProps = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
};

const CheckBox = ({ value, onValueChange }: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={[styles.checkboxBox, value && styles.checkboxBoxChecked]}>
      {value && <Text style={styles.checkboxTick}>✓</Text>}
    </TouchableOpacity>
  );
};

type Category = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Supplements';

type MealItem = {
  id: string;
  name: string;
  description: string;
  calories: string;
  protein: string;
  category: Category;
};

const MEAL_ITEMS: MealItem[] = [
  {
    id: 'oatmeal',
    name: 'Protein Oatmeal',
    description: 'Oats with whey protein, banana, and almonds.',
    calories: '450',
    protein: '35g',
    category: 'Breakfast',
  },
  {
    id: 'eggs',
    name: 'Scrambled Eggs & Toast',
    description: '3 whole eggs, whole grain toast, avocado.',
    calories: '380',
    protein: '22g',
    category: 'Breakfast',
  },
  {
    id: 'smoothie',
    name: 'Green Protein Smoothie',
    description: 'Spinach, banana, protein powder, almond milk.',
    calories: '320',
    protein: '28g',
    category: 'Breakfast',
  },
  {
    id: 'chicken-rice',
    name: 'Grilled Chicken & Rice',
    description: '200g chicken breast, brown rice, steamed vegetables.',
    calories: '520',
    protein: '45g',
    category: 'Lunch',
  },
  {
    id: 'salmon',
    name: 'Salmon & Quinoa',
    description: 'Baked salmon fillet, quinoa, roasted vegetables.',
    calories: '580',
    protein: '42g',
    category: 'Lunch',
  },
  {
    id: 'turkey-wrap',
    name: 'Turkey Wrap',
    description: 'Lean turkey, whole wheat wrap, veggies, hummus.',
    calories: '410',
    protein: '38g',
    category: 'Lunch',
  },
  {
    id: 'beef-sweet-potato',
    name: 'Lean Beef & Sweet Potato',
    description: '150g lean beef, baked sweet potato, broccoli.',
    calories: '550',
    protein: '48g',
    category: 'Dinner',
  },
  {
    id: 'fish-veg',
    name: 'Fish & Vegetables',
    description: 'Grilled fish, mixed vegetables, brown rice.',
    calories: '490',
    protein: '40g',
    category: 'Dinner',
  },
  {
    id: 'protein-bar',
    name: 'Protein Bar',
    description: 'High protein bar with 20g protein, low sugar.',
    calories: '220',
    protein: '20g',
    category: 'Snacks',
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt & Berries',
    description: 'Plain Greek yogurt with fresh berries and honey.',
    calories: '180',
    protein: '15g',
    category: 'Snacks',
  },
  {
    id: 'whey',
    name: 'Whey Protein Shake',
    description: '30g whey protein isolate, water or milk.',
    calories: '130',
    protein: '25g',
    category: 'Supplements',
  },
  {
    id: 'bcaa',
    name: 'BCAA Drink',
    description: 'Branched-chain amino acids for recovery.',
    calories: '10',
    protein: '0g',
    category: 'Supplements',
  },
];

const CATEGORIES: Array<'All' | Category> = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Supplements',
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [goalNotes, setGoalNotes] = useState('');
  const [isBulking, setIsBulking] = useState(false);
  const [acceptedPlan, setAcceptedPlan] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredItems =
    selectedCategory === 'All'
      ? MEAL_ITEMS
      : MEAL_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SectionList
          style={styles.menuList}
          contentContainerStyle={styles.menuContent}
          ListHeaderComponent={
            <View>
              <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
                <Text style={styles.appName}>Gym Diet Planner</Text>
                <Text style={styles.subtitle}>Your Nutrition Dashboard</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Active Plan</Text>
                  </View>
                  <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>
                      {isBulking ? 'Bulking' : 'Cutting'}
                    </Text>
                    <Switch value={isBulking} onValueChange={setIsBulking} />
                  </View>
                </View>
              </Animated.View>

              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
                }}
                style={styles.heroImage}
              />

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Add your fitness goals or notes..."
                  value={goalNotes}
                  onChangeText={setGoalNotes}
                />
              </View>

              <View style={styles.infoActionsRow}>
                <TouchableOpacity
                  style={styles.primaryAction}
                  onPress={() =>
                    Alert.alert('Nutrition Tips', 'Drink plenty of water and track your macros daily!')
                  }>
                  <Text style={styles.primaryActionText}>Get Tips</Text>
                </TouchableOpacity>
                <TouchableHighlight
                  style={styles.secondaryAction}
                  underlayColor="#4a90e2"
                  onPress={() => setShowTipsModal(true)}>
                  <Text style={styles.secondaryActionText}>View Plan</Text>
                </TouchableHighlight>
              </View>

              <View style={styles.checkboxRow}>
                <CheckBox value={acceptedPlan} onValueChange={setAcceptedPlan} />
                <Text style={styles.checkboxLabel}>
                  I understand this is a sample meal plan for reference.
                </Text>
              </View>

              <View style={styles.categoryRow}>
                {CATEGORIES.map((category) => {
                  const isActive = category === selectedCategory;
                  return (
                    <TouchableOpacity
                      key={category}
                      style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                      onPress={() => setSelectedCategory(category)}>
                      <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <FlatList
                horizontal
                data={MEAL_ITEMS.slice(0, 4)}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.popularList}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={styles.popularCard}
                    underlayColor="#e3f2fd"
                    onPress={() => setShowTipsModal(true)}>
                    <View>
                      <Text style={styles.popularTitle}>{item.name}</Text>
                      <Text style={styles.popularCalories}>{item.calories} cal</Text>
                    </View>
                  </TouchableHighlight>
                )}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.promoScroll}>
                <View style={styles.promoChip}>
                  <Text style={styles.promoText}>High Protein</Text>
                </View>
                <View style={styles.promoChip}>
                  <Text style={styles.promoText}>Low Cal</Text>
                </View>
                <View style={styles.promoChip}>
                  <Text style={styles.promoText}>Muscle Gain</Text>
                </View>
              </ScrollView>
            </View>
          }
          sections={[
            {
              title: 'Breakfast',
              data: MEAL_ITEMS.filter((i) => i.category === 'Breakfast'),
            },
            {
              title: 'Lunch',
              data: MEAL_ITEMS.filter((i) => i.category === 'Lunch'),
            },
            {
              title: 'Dinner',
              data: MEAL_ITEMS.filter((i) => i.category === 'Dinner'),
            },
            {
              title: 'Snacks',
              data: MEAL_ITEMS.filter((i) => i.category === 'Snacks'),
            },
            {
              title: 'Supplements',
              data: MEAL_ITEMS.filter((i) => i.category === 'Supplements'),
            },
          ]}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.menuCard}>
              <View style={styles.menuHeaderRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCalories}>{item.calories} cal</Text>
              </View>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.macroRow}>
                <Text style={styles.macroText}>Protein: {item.protein}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View>
              <Text style={styles.footerText}>
                Track your meals daily and adjust portions based on your fitness goals.
              </Text>
              <View style={styles.footerButtonRow}>
                <Button
                  title="Save Meal Plan"
                  onPress={() =>
                    Alert.alert(
                      'Plan Saved',
                      'Your meal plan has been saved. Stay consistent with your nutrition goals!'
                    )
                  }
                />
              </View>
            </View>
          }
        />

        <Modal visible={showTipsModal} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nutrition Tips</Text>
              <Text style={styles.modalText}>
                Aim for 1g protein per pound of bodyweight. Stay hydrated and eat whole foods
                for best results. Consistency is key!
              </Text>
              <Button title="Close" onPress={() => setShowTipsModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,
    backgroundColor: '#e8f4f8',
  },
  header: {
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  subtitle: {
    fontSize: 16,
    color: '#3949ab',
    marginTop: 4,
  },
  statusBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#43a047',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#5c6bc0',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#3949ab',
    borderColor: '#3949ab',
  },
  categoryText: {
    fontSize: 13,
    color: '#1a237e',
  },
  categoryTextActive: {
    color: 'white',
  },
  menuList: {
    flex: 1,
    marginTop: 8,
  },
  menuContent: {
    paddingBottom: 24,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
    color: '#1a237e',
  },
  itemCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3949ab',
  },
  itemDescription: {
    fontSize: 13,
    color: '#5c6bc0',
    marginBottom: 4,
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroText: {
    fontSize: 12,
    color: '#43a047',
    fontWeight: '600',
  },
  itemCategory: {
    fontSize: 11,
    color: '#7986cb',
  },
  footerText: {
    fontSize: 12,
    color: '#5c6bc0',
    marginTop: 8,
    textAlign: 'center',
  },
  heroImage: {
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  inputRow: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#90caf9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  infoActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  primaryAction: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#3949ab',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryActionText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryAction: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#c5cae9',
    alignItems: 'center',
  },
  secondaryActionText: {
    color: '#1a237e',
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#3949ab',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8eaf6',
  },
  checkboxBoxChecked: {
    backgroundColor: '#3949ab',
  },
  checkboxTick: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: '#5c6bc0',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 12,
    color: '#1a237e',
  },
  popularList: {
    paddingVertical: 8,
  },
  popularCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
  },
  popularCalories: {
    fontSize: 12,
    color: '#3949ab',
    marginTop: 2,
  },
  promoScroll: {
    paddingVertical: 8,
  },
  promoChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#c5cae9',
    marginRight: 8,
  },
  promoText: {
    fontSize: 12,
    color: '#1a237e',
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    color: '#1a237e',
  },
  footerButtonRow: {
    marginTop: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default App;
