'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  UserIcon,
  KeyIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import EmailIntegration from '@/components/account/EmailIntegration';

const tabs = [
  {
    id: 'profile',
    name: 'Profil',
    icon: UserIcon,
    description: 'Informations personnelles et préférences',
  },
  {
    id: 'security',
    name: 'Sécurité',
    icon: KeyIcon,
    description: 'Mot de passe et sécurité du compte',
  },
  {
    id: 'billing',
    name: 'Facturation',
    icon: CreditCardIcon,
    description: 'Abonnement et moyens de paiement',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon,
    description: 'Préférences de notifications',
  },
  {
    id: 'privacy',
    name: 'Confidentialité',
    icon: ShieldCheckIcon,
    description: 'Paramètres de confidentialité',
  },
  {
    id: 'integrations',
    name: 'Intégrations',
    icon: EnvelopeIcon,
    description: 'Connecter vos comptes email',
  },
  {
    id: 'team',
    name: 'Équipe',
    icon: UsersIcon,
    description: 'Gérer les membres de votre équipe',
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'billing':
        return <BillingTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'privacy':
        return <PrivacyTab />;
      case 'integrations':
        return <EmailIntegration />;
      case 'team':
        return <TeamTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mon Compte</h1>
        <p className="text-gray-600">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar with tabs */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-start space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{tab.name}</div>
                    <div className="text-sm text-gray-500 hidden lg:block">
                      {tab.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Profile Tab
function ProfileTab() {
  const [formData, setFormData] = useState({
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    company: 'Beauty Corp',
    position: 'Responsable Marketing',
    phone: '+33 1 23 45 67 89',
    website: 'https://beautycorp.com',
    bio: "Passionnée de marketing d'influence et de beauté.",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simuler la sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    console.log('Profil sauvegardé:', formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Informations personnelles
        </h2>
        <p className="text-sm text-gray-600">
          Modifiez vos informations de profil ci-dessous
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Votre prénom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Votre nom"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="votre@email.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entreprise
            </label>
            <Input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Poste
            </label>
            <Input
              type="text"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              placeholder="Votre poste"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+33 1 23 45 67 89"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site web
            </label>
            <Input
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://votre-site.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Décrivez-vous en quelques mots..."
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Composant Security Tab
function SecurityTab() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    setSaving(true);
    // Simuler la sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setPasswords({ current: '', new: '', confirm: '' });
    alert('Mot de passe modifié avec succès !');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Sécurité du compte
        </h2>
        <p className="text-sm text-gray-600">
          Modifiez votre mot de passe et gérez la sécurité de votre compte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe actuel
          </label>
          <Input
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            placeholder="Entrez votre mot de passe actuel"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nouveau mot de passe
          </label>
          <Input
            type="password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            placeholder="Entrez votre nouveau mot de passe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le nouveau mot de passe
          </label>
          <Input
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            placeholder="Confirmez votre nouveau mot de passe"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Conseils pour un mot de passe sécurisé :
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Au moins 8 caractères</li>
            <li>• Mélange de majuscules et minuscules</li>
            <li>• Au moins un chiffre</li>
            <li>• Au moins un caractère spécial (!@#$%^&*)</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Modification...' : 'Modifier le mot de passe'}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Composant Billing Tab
function BillingTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Facturation et abonnement
        </h2>
        <p className="text-sm text-gray-600">
          Gérez votre abonnement et vos moyens de paiement
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Plan Elite</h3>
            <p className="text-purple-100">1 000 recherches / mois</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">89€</div>
            <div className="text-purple-100">par mois</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-400">
          <p className="text-sm text-purple-100">
            Prochain paiement le 15 janvier 2025
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">
            Historique des paiements
          </h3>
          <div className="space-y-2">
            {[
              { date: '15 déc 2024', amount: '89,00 €', status: 'Payé' },
              { date: '15 nov 2024', amount: '89,00 €', status: 'Payé' },
              { date: '15 oct 2024', amount: '89,00 €', status: 'Payé' },
            ].map((payment, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <div>
                  <div className="font-medium">{payment.date}</div>
                  <div className="text-sm text-gray-500">Plan Elite</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{payment.amount}</div>
                  <div className="text-sm text-green-600">{payment.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Moyen de paiement</h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-500">Expire 12/25</div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Modifier le moyen de paiement
          </Button>
        </div>
      </div>
    </div>
  );
}

// Composant Notifications Tab
function NotificationsTab() {
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNews: true,
    emailReports: true,
    pushAlerts: false,
    smsImportant: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Paramètres sauvegardés !');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-600">
          Choisissez comment vous souhaitez être notifié
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            key: 'emailNews' as const,
            title: 'Nouveautés par email',
            description:
              'Recevoir des informations sur les nouvelles fonctionnalités',
          },
          {
            key: 'emailReports' as const,
            title: 'Rapports hebdomadaires',
            description: 'Résumé de votre activité chaque semaine',
          },
          {
            key: 'pushAlerts' as const,
            title: 'Notifications push',
            description: 'Alertes dans le navigateur',
          },
          {
            key: 'smsImportant' as const,
            title: 'SMS urgents',
            description: 'Notifications importantes par SMS',
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <div className="font-medium text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={() => handleToggle(item.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Sauvegarde...' : 'Sauvegarder les préférences'}
        </Button>
      </div>
    </div>
  );
}

// Composant Privacy Tab
function PrivacyTab() {
  const [saving, setSaving] = useState(false);
  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    analytics: false,
    marketing: true,
    profilePublic: false,
  });

  const handleToggle = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Paramètres de confidentialité sauvegardés !');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Confidentialité</h2>
        <p className="text-sm text-gray-600">
          Contrôlez vos données personnelles et leur utilisation
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            key: 'dataCollection' as const,
            title: 'Collecte de données',
            description: "Autoriser la collecte de données d'utilisation",
          },
          {
            key: 'analytics' as const,
            title: 'Données analytiques',
            description: 'Partager des statistiques anonymes',
          },
          {
            key: 'marketing' as const,
            title: 'Communications marketing',
            description: 'Recevoir des offres commerciales',
          },
          {
            key: 'profilePublic' as const,
            title: 'Profil public',
            description: 'Rendre votre profil visible publiquement',
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <div className="font-medium text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy[item.key]}
                onChange={() => handleToggle(item.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-red-900 mb-2">
          Zone de danger
        </h3>
        <p className="text-sm text-red-700 mb-3">
          Supprimez définitivement votre compte et toutes vos données.
        </p>
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          Supprimer mon compte
        </Button>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Sauvegarde...' : 'Sauvegarder les préférences'}
        </Button>
      </div>
    </div>
  );
}

// Composant Team Tab
function TeamTab() {
  const [_saving, _setSaving] = useState(false);
  const [_showInviteModal, _setShowInviteModal] = useState(false);
  const [teamMembers, _setTeamMembers] = useState([
    {
      id: 1,
      name: 'Marie Dupont',
      email: 'marie.dupont@example.com',
      role: 'Administrateur',
      status: 'Actif',
      avatar:
        'https://ui-avatars.com/api/?name=Marie+Dupont&background=8b5cf6&color=fff',
      joinedAt: '2024-01-15',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Gestion de l'équipe
        </h2>
        <p className="text-sm text-gray-600">
          Invitez et gérez les membres de votre équipe
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <UsersIcon className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-blue-900">
              {teamMembers.length}
            </div>
            <div className="text-sm text-blue-600">Membres dans l'équipe</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Membres de l'équipe
        </h3>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {member.role}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button className="flex items-center space-x-2">
            <UsersIcon className="w-4 h-4" />
            <span>Inviter un membre</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
